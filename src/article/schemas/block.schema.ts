import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Article } from './article.schema';

export type BlockDocument = Block & Document;

@Schema()
export class Block {
  @Prop({ required: true })
  type: string;

  @Prop()
  level: number;

  @Prop()
  text: string;

  @Prop()
  style: string;

  @Prop([String])
  items: string[];

  @Prop()
  code: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  })
  article: Article;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
