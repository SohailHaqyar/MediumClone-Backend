import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}
  @Get()
  getAllArticles() {
    return this.articleService.findAll();
  }

  @Get(':id')
  getOneArticle(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Post()
  createNewArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Delete('/nuke')
  nuke() {
    return this.articleService.nuke();
  }
}
