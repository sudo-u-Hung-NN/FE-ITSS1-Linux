import { ApiProperty } from '@nestjs/swagger';

export class CreateSmellDto {
  @ApiProperty()
  name: string;
}