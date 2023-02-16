import userInterface from '../interfaces/userInterface';
import loginInterface from '../interfaces/loginInterface';
import UserRepository from '../repositories/userRepository';
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken';

export default class UserBusiness {
    private userRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    async createUser(user: userInterface){
        const emailExists = await this.userRepository.getEmail(user.email);
        if ( emailExists ) return { statusCode: 400, message: "E-mail já cadastrado" }

        const usernameExists = await this.userRepository.getUsername(user.username);
        if ( usernameExists ) return { statusCode: 400, message: "Nome de usuário já cadastrado" }

        const hashPassword = await bcrypt.hash(user.password, 10);
        user.password = hashPassword;

        await this.userRepository.createUser(user);
        
        return {
            statusCode: 201,
            message: "Usuário criado com sucesso"
        }
    }   

    async login(login: loginInterface){
        const userExists = await this.userRepository.getUsername(login.username);
        if ( !userExists ) return { statusCode: 400, message: "Usuário ou senha inválidos" }

        const comparedPassword = await bcrypt.compare(login.password, userExists.password);
        if ( !comparedPassword ) return { statusCode: 400, message: "Usuário ou senha inválidos" }
        const token = JWT.sign(login, process.env.SECRET ?? '' , { expiresIn: '5h'})
        return {
            statusCode: 200,
            token,
        }
    }   
};