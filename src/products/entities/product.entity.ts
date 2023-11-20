import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Brand } from "./brand.entity";
import { Category } from "./category.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn({ type: 'int'})
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;
    
    @Column({ type: 'text'})
    description: string;

    @Column({ type: 'int'})
    price: number;

    @Column({ type: 'int'})
    stock: number;

    @Column({ type: 'varchar'})
    image: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Brand, (brand) => brand.products)
    brand: Brand;

    @ManyToMany(() => Category, (cat) => cat.products)
    @JoinTable()
    categories: Category[];
}