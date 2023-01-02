import { ApiProperty } from '@nestjs/swagger';

export class CreateTasteDto {
  @ApiProperty()
  name: string;
}