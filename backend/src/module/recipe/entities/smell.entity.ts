import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { RecipeSmell } from './smell-recipe.entity';
  
  @Entity({ name: 'smell' })
  export class Smell {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @OneToMany(() => RecipeSmell, (listRecipe) => listRecipe.rawmaterial)
    listRecipe: RecipeSmell[];
  }