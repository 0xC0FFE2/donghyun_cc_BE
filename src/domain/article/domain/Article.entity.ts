import { Category } from 'src/domain/category/domain/Category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, OneToMany } from 'typeorm';
import { Viewmode } from './enum/Viewmode';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn('increment')
  article_id: string;

  @CreateDateColumn({ type: 'datetime' })
  article_date: string;

  @Column()
  article_name: string;

  @Column()
  thumbnail_url: string;

  @Column()
  article_data_url: string;

  @Column({
    type: 'text',
    enum: Viewmode,
    default: Viewmode.PRIVATE
  })
  article_view_mode: Viewmode;

  @ManyToMany(() => Category, (category) => category.articles, { cascade: true, onDelete: 'CASCADE' })
  categorys: Category[];
}