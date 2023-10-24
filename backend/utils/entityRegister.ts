import { User } from "../entities/user";
import { UserAddress } from "../entities/userAddress";
import { Country } from "../entities/country";
import { Payment } from "../entities/payment";
import { Order } from "../entities/order";
import { OrderAddress } from "../entities/orderAddress";
import { Category } from "../entities/category";
import { CategoryImage } from "../entities/categoryImage";
import { OrderItem } from "../entities/orderItem";
import { Product } from "../entities/product";
import { ProductImage } from "../entities/productImage";
import { Cart } from "../entities/cart";
import { CartItem } from "../entities/cartItem";
import { Catalog } from "../entities/catalog";
import { CatalogItem } from "../entities/catalogItem";
import { CatalogUserGroup } from "../entities/catalogUserGroup";

const entityRegisterer = () => [
  User,
  UserAddress,
  Country,
  Payment,
  Order,
  OrderAddress,
  Category,
  CategoryImage,
  OrderItem,
  Product,
  ProductImage,
  Cart,
  CartItem,
  Catalog,
  CatalogItem,
  CatalogUserGroup,
];

export default entityRegisterer;
