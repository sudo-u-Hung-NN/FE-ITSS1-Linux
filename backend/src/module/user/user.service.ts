import { UpdatePasswordDto } from './dto/update-password.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from '../auth/payload.interface';
import { ForgotPassword } from './dto/forgot-password.dto';
import { VipUser } from './entities/vipuser.entity';
import { CreateVipUserDto } from './dto/create-vip.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(VipUser)
    private readonly userVipRepo: Repository<VipUser>,
  ) { }
  async createAdmin(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepo.save(createUserDto);
  }
  async create(createUserDto: CreateUserDto) {
    // createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    // createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepo.save(createUserDto);
  }
  async createVip(createUserDto: CreateVipUserDto) {
    const VipUser = await this.findVipByUserId(createUserDto.user_id);
    if (VipUser) {
      return "Bạn đã mua vip, chỉ có thể nâng cấp vip!"
    } else {
      const datenow = new Date(createUserDto.expireDate);
      if (createUserDto.vip_option === 1)
        createUserDto.expireDate = new Date(datenow.getTime() + (1000 * 60 * 60 * 24 * 365));
      if (createUserDto.vip_option === 2)
        createUserDto.expireDate = new Date(datenow.getTime() + (1000 * 60 * 60 * 24 * 365 * 100));
      // const {option,...vipUser}=createUserDto;
      const vipUser = { ...createUserDto }
      return this.userVipRepo.save(vipUser);
    }
  }

  async updateVIP(userID: number) {
    const user = await this.userRepo.findOne({ where: { id: userID } });
    if (!user) {
      return "Người dùng không tồn tại!"
    } else {
      const vipUser: CreateVipUserDto = await this.userVipRepo.findOne({ where: { user_id: userID } });
      if (vipUser && vipUser.vip_option === 1) {
        const datenow = new Date();
        vipUser.vip_option = 2;
        vipUser.expireDate = new Date(datenow.getTime() + (1000 * 60 * 60 * 24 * 365 * 100));
        return this.userVipRepo.save(vipUser);
      } else if (vipUser && vipUser.vip_option === 2) {
        return "Bạn đã sở hữu tài khoản VIP vĩnh viễn, không thể nâng cấp nữa!"
      } else {
        return "Bạn chưa mua gói vip nào, hãy mua vip!"
      }
    }
  }

  findVipByUserId(id: number) {
    return this.userVipRepo.findOne({ where: { user_id: id } });
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id: id } });
  }
  findName(name: string) {
    return this.userRepo.findOne({ where: { username: name } });
  }
  async login(email: string) {
    const user = await this.userRepo.findOne({ where: { email: email } });
    if (!user)
      throw new HttpException('Email does not exist', HttpStatus.NOT_FOUND);
    return user;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    if (this.userRepo.findOne({ where: { id: id } })) {
      updateUserDto.id = id;
      return this.userRepo.save(updateUserDto);
    }
    return `Accout khong ton tai`;
  }
  async forgotpassword(forgotpassword: ForgotPassword) {
    const user = await this.userRepo.findOne({
      where: { email: forgotpassword.email },
    });
    if (
      user.qid === forgotpassword.qid &&
      user.answer === forgotpassword.answer
    ) {
      return user.password;
    }
    return `Câu trả lời không đúng`;
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
  async userExist({ email }: JwtPayload) {
    const user = await this.userRepo.findOne({
      where: { email: email },
    });
    if (!user) throw new HttpException('invalidToken', HttpStatus.UNAUTHORIZED);
    return user;
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user: User = await this.userRepo.findOne({ where: { id: id } });
    if (user) {
      // user.password = await bcrypt.hash(updatePasswordDto.password, 10);
      user.password = updatePasswordDto.password;
      return this.userRepo.save(user);
    }
    return `Accout khong ton tai`;
  }
}
