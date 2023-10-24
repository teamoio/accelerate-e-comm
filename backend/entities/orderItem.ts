import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Order } from "./order";
import { Product } from "./product";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product, (product) => product.orderItem)
  @JoinColumn()
  product: Product;

  @Column()
  status: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
