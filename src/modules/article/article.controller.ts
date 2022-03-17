import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags } from "@nestjs/swagger";

@Controller('article')
@ApiTags('文章')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  async findAll(@Query('pageNum') pageNum:string,@Query('pageSize')pageSize:string) {
    return  this.articleService.findAll(pageNum,pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }



}
