import {
    Column,
    Entity, JoinColumn, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from "../../user/entities/user.entity";
import {Recipe} from "../../recipe/entities/recipe.entity";
@Entity({ name: 'comment' })
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    recipe_id: number;
    @Column()
    user_id: number;
    @Column()
    content: string;
    @Column()
    date_comment: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
    @ManyToOne(() => Recipe)
    @JoinColumn({ name: 'recipe_id', referencedColumnName: 'id' })
    recipe: Recipe;
}