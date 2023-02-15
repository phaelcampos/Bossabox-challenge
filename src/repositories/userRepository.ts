import { PrismaClient } from '@prisma/client'
import userInterface from '../interfaces/userInterface';

export default class UserRepository {

    private prisma;

    constructor(){

        this.prisma = new PrismaClient()

    }

    async createUser(user: userInterface){
        console.log(user)
        const reponse = await this.prisma.user.create({
            data: {
              email: 'alice@prisma.io',
              username: 'teste',
              password: 'teste',
            },
          })
        console.log("reponse",reponse)
        await this.prisma.$disconnect()
    }
}