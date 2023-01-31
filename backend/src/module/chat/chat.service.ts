import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Recipe } from '../recipe/entities/recipe.entity';
import { User } from '../user/entities/user.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,
    @InjectRepository(Recipe)
    private readonly recipeRepo:Repository<Recipe>,
    @InjectRepository(User)
    private readonly userRepo:Repository<User>,
  ){}
  create(createChatDto: CreateChatDto) {
    createChatDto.time = new Date();
    return this.chatRepo.save(createChatDto);
  }

  async findAll(sender_id: number, reciver_id: number, recipe_id: number) {
    const data = this.chatRepo.find({
      where: [{ sender_id: sender_id, reciver_id: reciver_id, recipe_id: recipe_id },
      { sender_id: reciver_id, reciver_id: sender_id, recipe_id: recipe_id }],
      take: 10,
      order: {
        id: "desc"
      }
    });

    return data;
    //   const queryBuilder =this.chatRepo.createQueryBuilder('chat');
    //   queryBuilder.where(`chat.recipe_id :recipe_id`, { recipe_id: recipe_id});
    //   queryBuilder.where(`chat.sender_id :sender_id and chat.reciver_id:reciver_id and chat.recipe_id :recipe_id`, { sender_id: sender_id,
    //   reciver_id:reciver_id,
    //   recipe_id: recipe_id,
    // });
    //   queryBuilder.orWhere(`chat.sender_id :sender_id and chat.reciver_id:reciver_id and chat.recipe_id :recipe_id`, { sender_id: reciver_id,
    //     reciver_id:sender_id,
    //     recipe_id: recipe_id
    //   });
    //   queryBuilder.orderBy('chat.time', 'ASC')
    //   queryBuilder.having('count(recipe_id)=:length', { length: 10 })
    //   console.log(queryBuilder.getQuery())
    //   const data = await queryBuilder.getRawMany();
    //   return data;
  }
  async list(id: number) {
    const chat = await this.chatRepo.find({where:{recipe_id:id}});
    const recipe=await this.recipeRepo.findOne({where:{id:id}});
    const list_id=[]
    for(  let i = 0; i < chat.length; ++i)
    { 
      if(chat[i].sender_id!==recipe.creator)
      list_id.push(chat[i].sender_id)
    }
  const list=Array.from(new Set(list_id));
  const data= await this.userRepo.find({
    where: {
      id: In(list),
    },
  });
  return data;
  }
  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
