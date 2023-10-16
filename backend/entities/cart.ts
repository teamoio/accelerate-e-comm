import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { CartItem } from "./cartItem";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
