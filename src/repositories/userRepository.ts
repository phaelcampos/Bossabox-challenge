import { PrismaClient } from '@prisma/client'
import userInterface from '../interfaces/userInterface';

export default class UserRepository {
    private prisma;
    constructor(){
        this.prisma = new PrismaClient()
    }

    async getEmail(email: string){
      const reponse = await this.prisma.user.findFirst({
          where:{
            email: email
          }
        })
      await this.prisma.$disconnect()
      return reponse
  }

  async getUsername(username: string){
    const reponse = await this.prisma.user.findFirst({
        where:{
          username: username
        }
      })
      await this.prisma.$disconnect()
      return reponse
  }

    async createUser(user: userInterface){
        const reponse = await this.prisma.user.create({
            data: {
              email: user.email,
              username: user.username,
              password: user.password,
            },
          })
        await this.prisma.$disconnect()
        return reponse
    }



}