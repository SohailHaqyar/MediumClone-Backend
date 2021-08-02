import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dtos/create-article.dto';
import { Article, ArticleDocument } from './schemas/article.schema';
import { Block, BlockDocument } from './schemas/block.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<ArticleDocument>,

    @InjectModel(Block.name)
    private blockModel: Model<BlockDocument>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const { blocks, title } = createArticleDto;
    const blockPromises = [];

    const article = new this.articleModel({ title });

    for (const b of blocks) {
      blockPromises.push(
        new this.blockModel({ ...b, article: article.id }).save(),
      );
    }
    const savedBlocks = await Promise.all(blockPromises);
    article.blocks = savedBlocks;
    return await article.save();
  }

  async findAll() {
    return await this.articleModel.find().populate('blocks');
  }

  async findOne(id: string) {
    const result = await this.articleModel
      .findById(id)
      .populate('blocks')
      .exec();
    return result;
  }

  async delete() {}

  async nuke() {
    return await this.articleModel.deleteMany();
  }
}
