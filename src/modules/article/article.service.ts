import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ArticleService {
  constructor(private readonly  prismaService:PrismaService) {

  }

  create(createArticleDto: CreateArticleDto) {
    return this.prismaService.article.create({data:createArticleDto})
  }

   async findAll(pageNum:string,pageSize:string) {

    const total = await this.prismaService.article.count({select:{_all:true}})
    const article = await this.prismaService.article.findMany({where:{},orderBy:{createAt:'desc'},  skip:(parseInt(pageNum)- 1) * parseInt(pageSize) , take: parseInt(pageSize)})
    const articleList = {
      total:total._all,
      article
    }
    console.log(article)
    return articleList
  }

  findOne(id: string) {
    return this.prismaService.article.findUnique({where:{id}})
  }


}
