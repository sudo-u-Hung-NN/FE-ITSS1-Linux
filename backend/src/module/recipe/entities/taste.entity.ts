import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { RecipeTaste } from './taste-recipe.entity';
  
  @Entity({ name: 'taste' })
  export class Taste {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @OneToMany(() => RecipeTaste, (listRecipe) => listRecipe.rawmaterial)
    listRecipe: RecipeTaste[];
  }