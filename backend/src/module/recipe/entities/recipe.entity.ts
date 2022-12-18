import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'recipe' })
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  formula: string;

  @Column()
  note: string;

  @Column()
  creator: number;

  @Column()
  price: number;

  @Column()
  views: number;
}
