import { Entity, PrimaryColumn, Column, BaseEntity, BeforeInsert } from 'typeorm';
import { uuid } from 'uuidv4';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('text')
  password: string;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}
