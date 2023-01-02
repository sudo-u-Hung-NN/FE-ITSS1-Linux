import { ApiProperty } from '@nestjs/swagger';

export class CreateNationDto {
  @ApiProperty()
  name: string;
}