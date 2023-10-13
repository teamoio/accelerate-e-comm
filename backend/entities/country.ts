import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
} from "typeorm";
import { UserAddress } from "./userAddress";
import { OrderAddress } from "./orderAddress";

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => UserAddress, (address) => address.country)
  address: UserAddress;

  @OneToOne(() => OrderAddress, (address) => address.country)
  orderAddress: OrderAddress;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
