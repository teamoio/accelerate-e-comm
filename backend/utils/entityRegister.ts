import { User } from "../entities/user";
import { UserAddress } from "../entities/userAddress";
import { Country } from "../entities/country";
import { Payment } from "../entities/payment";
import { Order } from "../entities/order";
import { OrderAddress } from "../entities/orderAddress";

const entityRegisterer = () => [
  User,
  UserAddress,
  Country,
  Payment,
  Order,
  OrderAddress,
];

export default entityRegisterer;
