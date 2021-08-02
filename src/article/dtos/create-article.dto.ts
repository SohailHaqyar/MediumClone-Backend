class Block {
  type: 'paragraph' | 'header' | 'code' | 'list';
  style: 'ordered' | 'unordered';
  level: number;
  text: string;
  items: string[];
  code: string;
}
export class CreateArticleDto {
  title: string;
  blocks: Block[];
}
