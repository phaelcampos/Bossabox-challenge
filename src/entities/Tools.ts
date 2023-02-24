import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('tools')
export class Tools {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text'})
    description: string

    @Column({type: 'text'})
    tags: string[]

    @Column({type: 'text', nullable: true})
    updateAt: string

    @Column({type: 'text'})
    link: string
    
    @ManyToOne(() => User, user => user.tools)
    @JoinColumn({name: 'user_id'})
    user:User

    @Column({type: 'text'})
    createdAt: string
}