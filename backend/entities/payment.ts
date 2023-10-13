import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user";
import { Order } from "./order";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn()
  order: Order;
}
