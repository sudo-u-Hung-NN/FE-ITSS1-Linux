import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';
import { Taste } from './taste.entity';

@Entity({ name: 'recipe_taste' })
export class RecipeTaste {
  @PrimaryColumn()
  id: number;

  @Column()
  recipe_id: number;

  @Column()
  taste_id: number;

  @ManyToOne(() => Recipe)
  @JoinColumn({ name: 'recipe_id', referencedColumnName: 'id' })
  recipe: Recipe;

  @ManyToOne(() => Taste)
  @JoinColumn({ name: 'taste_id', referencedColumnName: 'id' })
  rawmaterial: Taste;
}
