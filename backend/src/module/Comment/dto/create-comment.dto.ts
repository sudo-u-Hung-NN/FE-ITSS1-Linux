import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty()
    recipe_id:number;

    @ApiProperty()
    user_id:number;

    @ApiProperty()
    content:string;

    @ApiProperty()
    date_comment:Date;
}