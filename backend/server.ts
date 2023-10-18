import dotenv from "dotenv";
import dbConnect from "./database/dbConnect";
import app from "./app";

dotenv.config();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
  dbConnect();
});
