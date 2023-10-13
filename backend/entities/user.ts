import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserAddress } from "./userAddress";
import { Payment } from "./payment";
import { Order } from "./order";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string; // store hashed password as a string

  @OneToMany(() => UserAddress, (address) => address.user)
  addresses: UserAddress[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
