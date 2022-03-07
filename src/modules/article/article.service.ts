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

  findAll() {
    return this.prismaService.article.findMany({where:{}})
  }

  findOne(id: string) {
    return this.prismaService.article.findUnique({where:{id}})
  }


}
