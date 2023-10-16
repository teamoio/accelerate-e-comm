import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from "typeorm";
import { UserAddress } from "./userAddress";
import { Payment } from "./payment";
import { Order } from "./order";
import { Catalog } from "./catalog";
import { CatalogUserGroup } from "./catalogUserGroup";
import { Cart } from "./cart";

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

  @OneToMany(() => Catalog, (catalog) => catalog.user)
  catalogs: Catalog[];

  @OneToMany(
    () => CatalogUserGroup,
    (catalogUserGroup) => catalogUserGroup.user
  )
  catalogUserGroups: CatalogUserGroup[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
