import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
  } from 'typeorm';
  import { Recipe } from './recipe.entity';
import { Smell } from './smell.entity';
  
  @Entity({ name: 'recipe_smell' })
  export class RecipeSmell {
    @PrimaryColumn()
    id: number;
  
    @Column()
    recipe_id: number;
  
    @Column()
    smell_id: number;
  
    @ManyToOne(() => Recipe)
    @JoinColumn({ name: 'recipe_id', referencedColumnName: 'id' })
    recipe: Recipe;
  
    @ManyToOne(() => Smell)
    @JoinColumn({ name: 'smell_id', referencedColumnName: 'id' })
    rawmaterial: Smell;
  }
  