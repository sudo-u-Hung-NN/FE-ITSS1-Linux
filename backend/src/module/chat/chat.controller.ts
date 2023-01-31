import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chat')
@ApiTags('Chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }
  @Public()
  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }
  @Public()
  @Get('/:sender_id/:reciver_id/:recipe_id')
  findAll(@Param('sender_id') sender_id: number,
    @Param('reciver_id') reciver_id: number,
    @Param('recipe_id') recipe_id: number) {
    return this.chatService.findAll(sender_id, reciver_id, recipe_id);
  }
  @Public()
  @Get('get-list-by-recipe_id/:id')
  list(@Param('id') id: number) {
    return this.chatService.list(id);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(+id, updateChatDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatService.remove(+id);
  // }
}
