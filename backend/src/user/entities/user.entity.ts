import { Entity, Column } from 'typeorm';
@Entity()
export class User {
  @Column()
  username: string;
  @Column()
  password: string;
}
