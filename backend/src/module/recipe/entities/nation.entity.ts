import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { RecipeRawMaterial } from './recipe-raw-material.entity';
  
  @Entity({ name: 'nation' })
  export class Nation {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  }