import { DataSource } from "typeorm";
import dotenv from "dotenv";
import entityRegistrar from "../utils/entityRegister";
dotenv.config();

export const AppDataSource = new DataSource({
  //TODO: Fetch these values from .env
  // @ts-ignore Couldn't find suitable
  type: process.env.DB_TYPE || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: (process.env.DB_PORT as number | undefined) || 5432,
  username: process.env.DB_USERNAME || "kamran.shahid",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "test",
  logging: true,
  entities: entityRegistrar(),
  migrations: [__dirname + "/migrations/**/*.ts"],
});

const dbConnect = () => {
  AppDataSource.initialize()
    .then(() => console.log("Database connected successfully..."))
    .catch((error) => console.log("Database connection failed...", error));
};

export default dbConnect;
