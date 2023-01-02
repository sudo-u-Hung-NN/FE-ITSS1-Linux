import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeSmellDto {
  @ApiProperty()
  recipe_id: number;

  @ApiProperty()
  smell_id: number;
}