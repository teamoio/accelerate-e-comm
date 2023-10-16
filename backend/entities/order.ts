import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user";
import { Payment } from "./payment";
import { OrderAddress } from "./orderAddress";
import { OrderItem } from "./orderItem";
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;

  @OneToMany(() => OrderAddress, (orderAddress) => orderAddress.order)
  orderAddresses: OrderAddress[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
