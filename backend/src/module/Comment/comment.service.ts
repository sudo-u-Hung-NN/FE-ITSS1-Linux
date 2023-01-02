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
        }
        return "người dùng đã comment";
    }

    // async getComment(id: number) {
    //     const playlist = this.commentRepository.createQueryBuilder("comment")
    //     playlist.where("comment.recipe_id = :id", { id })
    //     playlist.select("AVG(voting.amount_star)", 'avg')
    //     const data = await playlist.getRawOne()
    //     return data;
    //     // return this.votingRepo.findOne({where:{id:id}});
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} voting`;
    // }
    //
    // update(id: number, updateVotingDto: UpdateVotingDto) {
    //     return `This action updates a #${id} voting`;
    // }
    //
    // remove(id: number) {
    //     return `This action removes a #${id} voting`;
    // }
}
