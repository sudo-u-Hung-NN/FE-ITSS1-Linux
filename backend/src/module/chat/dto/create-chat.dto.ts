import { ApiProperty } from "@nestjs/swagger";

export class CreateChatDto {
    @ApiProperty()
    sender_id:number;

    @ApiProperty()
    reciver_id:number;

    time:Date;

    @ApiProperty()
    content:string;

    @ApiProperty()
    recipe_id:number;
}
