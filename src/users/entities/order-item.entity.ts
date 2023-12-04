import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";
import { Exclude } from "class-transformer";

@Entity({ name: 'orders_items'})
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;
  
    @Exclude()
    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;

    @Column({ type: 'int'})
    quantity: number;

    @ManyToOne(() => Product)
    product: Product;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;
}