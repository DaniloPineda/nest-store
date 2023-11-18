import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  email: string;

  @Column({type: 'varchar'})
  password: string;

  @Column({ type: 'text'})
  role: string;
}