import { User } from "../../entities/user";
import { AppDataSource } from "../../database/dbConnect";

const userRepo = AppDataSource.getRepository(User);

export const createUser = async (req: any, res: any) => {
  try {
    const { name, email, password, status, is_admin } = req.body;

    if (!name || !email || !password || !status || !is_admin) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide all necessary user details.",
      });
    }

    const user: User = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.status = status;
    user.is_admin = is_admin;

    const result = await userRepo.save(user);
    return res.status(200).json({
      message: "User created successfully!",
      user: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "User creation failed!",
      error: error,
    });
  }
};
