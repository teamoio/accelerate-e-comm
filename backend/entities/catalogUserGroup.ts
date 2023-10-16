import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Catalog } from "./catalog";
import { User } from "./user";

@Entity()
export class CatalogUserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Catalog, (catalog) => catalog.catalogUserGroups)
  catalog: Catalog;

  @ManyToOne(() => User, (user) => user.catalogUserGroups)
  user: User;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
