import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('blog')
export class Blog {
    @PrimaryColumn()
    blog_name: string;

    @Column()
    blog_visitors: number;
}