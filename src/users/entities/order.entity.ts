import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { OrderItem } from "./order-item.entity";
import { Exclude, Expose } from "class-transformer";

@Entity({ name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, (c) => c.orders)
    customer: Customer;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => OrderItem, (prod) => prod.order)
    @Exclude()
    items: OrderItem[];

    @Expose()
    get products() {
        if(this.items){
            return this.items.filter((item) => !!item)
            .map((item) => ({
                ...item.product,
                quatity: item.quantity,
                itemId: item.id
            }))
        }            
        return [];
    }

    @Expose()
    get total(){
        if(this.items) {
            return this.items.filter((item) => !!item)
            .reduce((total, item) => {
                return total + (item.product.price * item.quantity)
            }, 0) 
        }
        return 0;
    }
}