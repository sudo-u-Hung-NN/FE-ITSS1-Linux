import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  formula: string;

  @ApiProperty()
  note: string;
  
  @ApiProperty()
  nation: number;

  @ApiProperty()
  creator: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  views: number;

  @ApiProperty()
  videoUrl: string;
}
