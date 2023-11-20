import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Order } from "./order.entity";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'varchar', length: 255})
  lastName: string;

  @Column({type: 'varchar', length: 255})
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.customer)
  user: User

  @OneToMany(() => Order, (o)=>o.customer)
  orders: Order[];
}