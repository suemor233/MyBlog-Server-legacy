import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsUrl } from "class-validator";

export class CreateArticleDto {
  @ApiProperty({ description: "文章标题", example: "Hello World" })
  @IsOptional()
  title: string;

  @ApiProperty({ required:false,description: "文章内容", example: "我是文章内容" })
  @IsOptional()
  content: string;

  @ApiProperty({ description: "文章封面地址", example: "http://example.com" })
  @IsUrl({ require_protocol: true }, { message: "请更正为正确的网址" })
  @IsOptional()
  cover: string;

  @ApiProperty({ description: "是否发布", example: false })
  @IsOptional()
  state: boolean;

  @ApiProperty({description: "文章标签", example: "javascript" })
  @IsOptional()
  tags: string;

  @ApiProperty({ description: "文章分类",example: "学习" })
  @IsOptional()
  category: string;

}
