import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Recipe } from '../recipe/entities/recipe.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Chat,Recipe])],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
