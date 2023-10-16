import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { CatalogUserGroup } from "./catalogUserGroup";
import { CatalogItem } from "./catalogItem";

@Entity()
export class Catalog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  discountRate: number;

  @ManyToOne(() => User, (user) => user.catalogs)
  user: User;

  @OneToMany(
    () => CatalogUserGroup,
    (catalogUserGroup) => catalogUserGroup.catalog
  )
  catalogUserGroups: CatalogUserGroup[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => CatalogItem, (catalogItem) => catalogItem.catalog)
  catalogItems: CatalogItem[];
}
