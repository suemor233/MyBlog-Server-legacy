import { IsEmail, IsOptional, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: "用户名", example: "suemor" })
  @IsOptional()
  userName: string;

  @ApiProperty({ required:false,description: "自我介绍", example: "hello 你好 我是XXX" })
  @IsOptional()
  introduce: string;

  @ApiProperty({ description: "github地址", example: "http://example.com" })
  @IsUrl({ require_protocol: true }, { message: "请更正为正确的网址" })
  @IsOptional()
  githubUrl: string;

  @ApiProperty({description: "邮箱地址", example: "example@example.com" })
  @IsEmail()
  @IsOptional()
  emailUrl: string;

  @ApiProperty({ description: "twitter地址",example: "http://example.com" })
  @IsUrl({ require_protocol: true }, { message: "请更正为正确的网址" })
  @IsOptional()
  twitterUrl: string;

  @ApiProperty({ description: "头像地址",example: "http://example.com" })
  @IsUrl({ require_protocol: true }, { message: "请更正为正确的网址" })
  @IsOptional()
  avatar: string;



}
