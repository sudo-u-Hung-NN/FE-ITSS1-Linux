import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  id: number;
  @ApiProperty()
  email: string;
  
  @ApiProperty()
  username:string;

  @ApiProperty()
  phone:number;

  @ApiProperty()
  birth_date:Date;

  @ApiProperty()
  avatar:string;
}
