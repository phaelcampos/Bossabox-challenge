import userInterface from '../interfaces/userInterface';
import loginInterface from '../interfaces/loginInterface';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { BadRequestError, ConflictError, UnauthorizedError } from '../helpers/apiErrors';
import { userRepository } from '../repositories/userRepository';
import { User } from '../entities/User';

export default class UserBusiness {
  async createUser(user: userInterface){
      const emailExists = await userRepository.findOneBy({
          email: user.email
      })
      if ( emailExists ) throw new ConflictError("E-mail já cadastrado");

      const usernameExists = await userRepository.findOneBy({
          username: user.username
      })
      if ( usernameExists ) throw new ConflictError("Nome de usuário já cadastrado" );

      const hashPassword = await bcrypt.hash(user.password, 10);

      user.password = hashPassword;

      const userTocreate = userRepository.create(user);
      await userRepository.save(userTocreate);
      
      return {
          statusCode: 201,
          message: "Usuário criado com sucesso"
      }
  }   

  async login(login: loginInterface){
      const userExists = await userRepository.findOneBy({
          username: login.username
      })
      console.log(userExists)
      if ( !userExists ) throw new BadRequestError("Usuário ou senha inválidos")
      login.id = userExists.id
      
      const comparedPassword = await bcrypt.compareSync(login.password, userExists.password);
      if ( !comparedPassword ) throw new BadRequestError("Usuário ou senha inválidos");
      
      const token = JWT.sign(login, process.env.SECRET ?? '' , { expiresIn: '5h' })
      return {
          statusCode: 200,
          token,
      }
  }   

  async authenticate(token:string): Promise<userInterface>{
      try{
          await JWT.verify(token, process.env.SECRET ?? '' , );
          const decodedToken = JWT.decode(token);
          return decodedToken as userInterface;
      }catch(error: any){
          console.log(error);
          throw new UnauthorizedError(error.message);
      }
  }
};