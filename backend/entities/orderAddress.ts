import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";

import { Order } from "./order";

@Entity()
export class OrderAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  houseNumber: string;

  @Column()
  streetName: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @ManyToOne(() => Order, (order) => order.orderAddresses)
  order: Order;

  @Column()
  isdefault: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
