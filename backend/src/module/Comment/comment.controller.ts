import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
@ApiBearerAuth()
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}
    @Public()
    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.createComment(createCommentDto);
    }
    @Public()
    @Get('/get-by-recipe_id/:id')
    getStars(@Param('id') id:number) {
        return this.commentService.getCommentsByRecipeID(id);
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.votingService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateVotingDto: UpdateVotingDto) {
    //   return this.votingService.update(+id, updateVotingDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.votingService.remove(+id);
    // }
}