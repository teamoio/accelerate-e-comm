// Import necessary modules from TypeORM
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Catalog } from "./catalog";
import { Product } from "./product";
@Entity()
export class CatalogItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => Catalog, (catalog) => catalog.catalogItems)
  catalog: Catalog;

  @OneToOne(() => Product, (product) => product.catalogItem)
  @JoinColumn()
  product: Product;
}
