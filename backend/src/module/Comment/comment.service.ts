import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto} from "./dto/update-comment.dto";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) { }

    async createComment(createCommentDto: CreateCommentDto) {
        const comment = await this.commentRepository.findOne({
            where: {
                recipe_id: createCommentDto.recipe_id,
                user_id: createCommentDto.user_id
            }
        });
        if (!comment) {
            return this.commentRepository.save(createCommentDto)
        } {
            return "Đã comment rồi, comment gì nữa!"
        }
        return "người dùng đã comment";
    }
    async updateComment(updateCommentDto: UpdateCommentDto) {
        const comment = await this.commentRepository.findOne({
            where: {
                recipe_id: updateCommentDto.recipe_id,
                user_id: updateCommentDto.user_id
            }
        });
        if (comment) {
            comment.content=updateCommentDto.content;
            comment.date_comment=updateCommentDto.date_comment;
            return this.commentRepository.save(comment)
        }
        else  
        {
            return "Nguoi dung chua comment"
        }
        return "người dùng đã  chỉnh sửa comment";
    }

    async getCommentsByRecipeID(recipe_id: number) {
          const queryBuilder = this.commentRepository.createQueryBuilder(
            'comment',
          );
          queryBuilder.leftJoinAndSelect(
            `comment.user`,
            `user`,
          );
          queryBuilder.where(`comment.recipe_id = :recipe_id`, {
            recipe_id: recipe_id,
          });
          const comments=queryBuilder.getRawMany();
        if (!comments) {
      return 'Chưa có comment, vui lòng để lại comment!';
        }
        return comments;
    }
}
