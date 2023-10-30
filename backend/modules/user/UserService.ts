// UserService.js
import { AppDataSource } from "../../database/dbConnect";
import { User } from "../../entities/user";
const bcrypt = require("bcrypt");

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(
    email: string,
    password: string,
    name: string,
    status: string,
    is_admin: boolean,
    res: any
  ) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: [{ email: email }, { name: name }],
      });

      if (existingUser) {
        if (existingUser.email === email) {
          res.send({
            status: 400,
            message: "User with this email already exists.",
          });
        } else if (existingUser.name === name) {
          res.send({
            status: 400,
            message: "User with this name already exists.",
          });
        }
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = hashedPassword;
        user.status = status;
        user.is_admin = is_admin;

        const result = await this.userRepository.save(user);
        return result;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      return user;
    } catch (error) {
      throw new Error("Error while finding user by email: " + error);
    }
  }
}
