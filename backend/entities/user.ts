import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { UserAddress } from "./userAddress";
import { Payment } from "./payment";
import { Order } from "./order";
import { Catalog } from "./catalog";
import { CatalogUserGroup } from "./catalogUserGroup";

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

  @Column()
  is_admin: boolean;

  @Column()
  status: string;

  @OneToMany(() => UserAddress, (address) => address.user)
  addresses: UserAddress[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Catalog, (catalog) => catalog.user)
  catalogs: Catalog[];

  @OneToMany(
    () => CatalogUserGroup,
    (catalogUserGroup) => catalogUserGroup.user
  )
  catalogUserGroups: CatalogUserGroup[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
