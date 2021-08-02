import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArticleService } from './article/article.service';
import { ArticleModule } from './article/article.module';

const url =
  'mongodb+srv://sohail:4xEQuhJ7kYjM8vO6@cluster0.wnkoq.mongodb.net/mediumClone?retryWrites=true&w=majority';
@Module({
  imports: [
    MongooseModule.forRoot(url, { useNewUrlParser: true }),
    UsersModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
