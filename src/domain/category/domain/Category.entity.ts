import { Article } from 'src/domain/article/domain/Article.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column()
  category_name: string;

  @ManyToMany(() => Article, (article) => article.categorys)
  @JoinTable()
  articles: Article[];
}