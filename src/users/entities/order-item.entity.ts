import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'int'})
    quantity: number;

    @ManyToOne(() => Product)
    product: Product;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;
}