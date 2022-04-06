import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { encryptPassword, makeSalt } from "../../utils/cryptogram.util";
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {

  constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) {

  }

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: createUserDto
    });
  }

  async findOne(userName: string) {
    const user = await this.prismaService.user.findUnique({ where: { userName } });
    delete user.password
    delete user.salt
    return user
  }

  async login(createUserDto: CreateUserDto) {
    let { userName,password } = createUserDto;

    if (!userName){
      throw new NotFoundException("用户名不能为空");
    }

    if (!password){
      throw new NotFoundException("密码不能为空");
    }
    // @ts-ignore
    const user = await this.prismaService.user.findFirst({ where: { userName } });
    if (!user){
      throw new NotFoundException("用户名不存在");
    }

    // @ts-ignore
    const currentHashPassword = encryptPassword(password, user.salt)


    if (currentHashPassword !== user.password){
      throw new NotFoundException('密码错误')
    }

    const token = await this.certificate(user)
    delete user.password
    delete user.salt
    user['token'] = token

    return user
  }

  // 生成 token
  async certificate(user: CreateUserDto) {

    const payload = {
      userName:user.userName
    };
    const token = this.jwtService.sign(payload);
    return token
  }


  async register(createUserDto: CreateUserDto) {
    let { userName, password } = createUserDto;
    const user = await this.prismaService.user.findUnique({ where: { userName } });
    if (user && userName.toLowerCase() == user.userName.toLowerCase()) {
      throw new NotFoundException("用户已存在");
    }

    const salt = makeSalt();
    password = encryptPassword(password, salt);

    await this.prismaService.user.create({
      data: {
        userName,
        password,
        // @ts-ignore
        salt
      }
    });
    return "注册成功";
  }
}
