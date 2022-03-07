import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UserService {

  constructor(private readonly  prismaService:PrismaService) {

  }

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data:createUserDto
    })
  }


  findOne(userName: string) {
    return this.prismaService.user.findUnique({where:{userName}})
  }
}
