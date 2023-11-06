import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./user";

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  houseNumber: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @Column()
  streetName: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @Column()
  isdefault: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
