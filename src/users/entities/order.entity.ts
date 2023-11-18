import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date'})
    date: string;

    @Column({ type: 'integer'})
    customerId: number;

    // @Column({ type: })
    // productIds: number[];
}