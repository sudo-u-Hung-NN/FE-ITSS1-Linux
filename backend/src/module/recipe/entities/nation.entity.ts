import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  @Entity({ name: 'nation' })
  export class Nation {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  }