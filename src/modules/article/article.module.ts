import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  controllers: [ArticleController],
  providers: [ArticleService,PrismaService]
})
export class ArticleModule {}
