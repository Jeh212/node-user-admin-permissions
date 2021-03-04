import {Request,Response,NextFunction} from 'express'
import User from '../models/Users'
import {decode} from 'jsonwebtoken';
import { UserRespository } from '../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';

async function decoder(request:Request):Promise<User | undefined>{
  
  const authHeader = request.headers.authorization || "";
  const userRepository = getCustomRepository(UserRespository);

  const [, token] = authHeader?.split(" ");
  
  const payload =decode(token)

  const userID = await userRepository.findOne(payload?.sub,{relations:['roles']});


  return userID

}


  function is(role:string[]){

  const roleAuthorized = async (
    request:Request,
    response:Response,
    next:NextFunction) => {


    const user = await decoder(request);
    
    const userRoles = user?.roles.map(role=>role.name)

    const existsRoles = userRoles?.some(r=> role.includes(r))



      if(existsRoles){
        return next();
      }

      return response.status(400).json({
        msg:`User ${user?.username} not AUTHORIZED`
      })

  };

  return roleAuthorized;

}

export {is}