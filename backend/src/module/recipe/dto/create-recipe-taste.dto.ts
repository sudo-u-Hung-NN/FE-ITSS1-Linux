import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeTasteDto {
  @ApiProperty()
  recipe_id: number;

  @ApiProperty()
  taste_id: number;
}