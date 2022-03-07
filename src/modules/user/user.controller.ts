import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from "@nestjs/swagger";

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Get()
  findOne(@Query('username') username: string) {
    return this.userService.findOne(username);
  }

}
