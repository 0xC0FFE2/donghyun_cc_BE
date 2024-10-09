import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('blog')
export class Blog {
    @PrimaryColumn()
    blog_name: string;

    @Column()
    blog_visitors_total: number;

    @Column()
    blog_visitors_weekly: number;

    @Column()
    blog_total_articles: number;
}