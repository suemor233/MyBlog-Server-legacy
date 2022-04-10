import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common";
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@Controller('article')
@ApiTags('文章')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Post('/update')
  articleUpdate(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.articleUpdate(createArticleDto);
  }

  @Get()
  async findAll(@Query('pageNum') pageNum:string,@Query('pageSize')pageSize:string) {
    return this.articleService.findAll(pageNum,pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id)
    return this.articleService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('/delete/:id')
  deleteArticleById(@Param('id') id: string) {

    return this.articleService.deleteOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('/delete')
  deleteArticles(@Body() ids:string[]) {
    return this.articleService.deleteArticles(ids);
  }

}
