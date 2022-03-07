import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { ResponseInterceptor } from "./commom/filters/response.interceptor";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({origin:true,credentials:true})
  const config = new DocumentBuilder()
    .setTitle('suemor博客API')
    .setDescription('这里是suemor博客的swagger文档')
    .setVersion('1.0')
    .addTag('article')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
