import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
export const AppDataSource = new DataSource({
  //TODO: Fetch these values from .env
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "kamran.shahid",
  password: "",
  database: "test",
  logging: true,
  synchronize: true,
  entities: ["modules/*/*.entity{.ts,.js}"],
});

const dbConnect = () => {
  AppDataSource.initialize()
    .then(() => console.log("Database connected successfully..."))
    .catch((error) => console.log("Database connection failed...", error));
};

export default dbConnect;
