import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('categories')
@Unique(['title'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  title: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
