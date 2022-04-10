import { Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {

  }

  create(createArticleDto: CreateArticleDto) {

    return this.prismaService.article.create({ data: createArticleDto });
  }

  async findAll(pageNum: string, pageSize: string) {

    if (pageNum && pageSize) {
      const total = await this.prismaService.article.count({ select: { _all: true } });
      const article = await this.prismaService.article.findMany({
        where: {},
        orderBy: { createAt: "desc" },
        skip: (parseInt(pageNum) - 1) * parseInt(pageSize),
        take: parseInt(pageSize)
      });
      return {
        total: total._all,
        article
      };
    } else {
      const article = await this.prismaService.article.findMany({ where: {}, orderBy: { createAt: "desc" } });
      return {
        article
      };
    }
  }

  findOne(id: string) {
    return this.prismaService.article.findUnique({ where: { id } });
  }


  async deleteOne(id: string) {
    await this.prismaService.article.delete({
      where: { id }
    });

    return this.findAll("", "");
  }


  async deleteArticles(ids: string[]) {
     ids.map(async (id: string,index) => {
       await this.prismaService.article.delete({
        where: { id }
      });
    });
  }

  async articleUpdate(createArticleDto: CreateArticleDto) {
    console.log(createArticleDto)
    await this.prismaService.article.update({
      // @ts-ignore
      where: { id: createArticleDto.id },
      data: createArticleDto ,
    })
  }
}
