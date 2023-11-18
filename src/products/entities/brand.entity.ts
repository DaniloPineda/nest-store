import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250, unique: true })
  name: string;

  @Column({ type: 'varchar'})
  image: string;
}