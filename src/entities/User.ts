import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tools } from "./Tools";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: 'text'})
    username: string

    @Column({type: 'text'})
    email: string

    @Column({type: 'text'})
    password: string

    @OneToMany(() => Tools, video => video.user)
    tools: Tools[];
}