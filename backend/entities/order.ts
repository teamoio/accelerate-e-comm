import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { Payment } from "./payment";
import { OrderAddress } from "./orderAddress";
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

  //add order items
}
