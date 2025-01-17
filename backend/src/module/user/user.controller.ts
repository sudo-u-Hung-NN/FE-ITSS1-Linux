import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ForgotPassword } from './dto/forgot-password.dto';
import { CreateVipUserDto } from './dto/create-vip.dto';
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  // @Public()
  // @Post('/admin')
  // createAdmin(@Body() createUserDto: CreateUserDto) {
  //   createUserDto.user_role_id=1;
  //   return this.userService.create(createUserDto);
  // }
  @Public()
  @Post('')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Public()
  @Post('/vip')
  createVip(@Body() createUserDto: CreateVipUserDto) {
    return this.userService.createVip(createUserDto);
  }
  @Public()
  @Get('/vip/get-by-userId/:id')
  getVipByUserId(@Param('id') id: string) {
    return this.userService.findVipByUserId(+id);
  }
  @Public()
  @Patch('/vip/update/:userId')
  updateVIPForUser(@Param('userId') id: number) {
    return this.userService.updateVIP(id);
  }
  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }
  @Public()
  @Get('/getall')
  findAll() {
    return this.userService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Public()
  @Post('forgotpassword')
  forgotpassword(@Body() forgotpassword: ForgotPassword) {
    return this.userService.forgotpassword(forgotpassword);
  }
  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }

  @Public()
  @Patch('/update-pass/:id')
  updatePasswords(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(+id, updatePasswordDto);
  }
  @Public()
  @Patch('/block/:id')
  blockUser(
    @Param('id') id: string
  ) {
    return this.userService.blockUser(+id);
  }
}
