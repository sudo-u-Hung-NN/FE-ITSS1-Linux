import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'chat'})
export class Chat {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    sender_id:number;

    @Column()
    reciver_id:number;

    @Column()
    time:Date;

    @Column()
    content:string;

    @Column()
    recipe_id:number;
}