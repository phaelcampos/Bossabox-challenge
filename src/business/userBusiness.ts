
import userInterface from '../interfaces/userInterface';
import UserRepository from '../repositories/userRepository';

export default class UserBusiness {
    private userRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    async createUser(user: userInterface){
        this.userRepository.createUser(user)
    }   
}