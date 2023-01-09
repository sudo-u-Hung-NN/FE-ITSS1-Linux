import { ApiProperty } from '@nestjs/swagger';
export class CreateVipUserDto {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  vip_option: number;

  @ApiProperty()
  expireDate: Date;
}