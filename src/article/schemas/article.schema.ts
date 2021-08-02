import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Block } from './block.schema';
import * as mongoose from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop([
    { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Block' },
  ])
  blocks: Block[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
