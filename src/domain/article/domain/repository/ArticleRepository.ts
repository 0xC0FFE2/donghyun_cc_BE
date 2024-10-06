import { Repository } from 'typeorm';
import { Article } from '../Article.entity';
import { Module } from '@nestjs/common';

export class ArticleRepository extends Repository<Article> {
    
}
