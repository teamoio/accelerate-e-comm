import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { OrderItem } from "./orderItem";
import { Category } from "./category";
import { ProductImage } from "./productImage";
import { CatalogItem } from "./catalogItem";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @OneToOne(() => OrderItem, (orderItem) => orderItem.product)
  orderItem: OrderItem;

  @Column()
  status: string;

  @Column()
  is_active: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  images: ProductImage[];

  @OneToOne(() => CatalogItem, (catalogItem) => catalogItem.product)
  catalogItem: CatalogItem;
}
