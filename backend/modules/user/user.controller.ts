import { User } from "../../entities/user";
import { AppDataSource } from "../../database/dbConnect";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { UserService } from "./UserService";
import { config } from "dotenv";

const userRepo = AppDataSource.getRepository(User);

const userService = new UserService();

export const signup = async (req: any, res: any) => {
  try {
    const { name, email, password, status, is_admin } = req.body;

    if (!name || !email || !password || !status || is_admin === undefined) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide all necessary user details.",
      });
    }

    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const result = await userService.create(
      email,
      password,
      name,
      status,
      is_admin,
      res
    );

    if (!result) {
      return res
        .status(500)
        .json({ message: "User creation failed. Please try again later." });
    }

    const token = jwt.sign(
      { email: result.email, id: result.id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(200)
      .json({ message: "User created successfully", user: result, token });
  } catch (error) {
    return error;
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed. Please try again later." });
  }
};

export const logout = (req: any, res: any) => {
  res.clearCookie("jwtToken");
  return res.status(200).json({ message: "Logout successful" });
};

export const createUser = async (req: any, res: any) => {
  try {
    const { name, email, password, status, is_admin } = req.body;

    if (!name || !email || !password || !status || is_admin === undefined) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide all necessary user details.",
      });
    }

    const result = await userService.create(
      email,
      password,
      name,
      status,
      is_admin,
      res
    );
    return res.status(200).json({
      message: "User created successfully!",
      user: result,
    });
  } catch (error: any) {
    return error;
  }
};

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await userRepo.find();

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found!",
      });
    } else {
      return res.status(200).json({
        message: "Users fetched successfully!",
        users: users,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Users fetch failed!",
      error: error,
    });
  }
};

export const getUserById = async (req: any, res: any) => {
  try {
    const user = await userRepo.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    } else {
      return res.status(200).json({
        message: "User fetched successfully!",
        user: user,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "User fetch failed!",
      error: error,
    });
  }
};

export const updateUser = async (req: any, res: any) => {
  try {
    const user = await userRepo.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    } else {
      const { name, email, password, status, is_admin } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      user.name = name;
      user.email = email;
      user.password = hashedPassword;
      user.status = status;
      user.is_admin = is_admin;

      const result = await userRepo.save(user);
      return res.status(200).json({
        message: "User updated successfully!",
        user: result,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "User update failed!",
      error: error,
    });
  }
};

export const deleteUser = async (req: any, res: any) => {
  try {
    const user = await userRepo.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    } else {
      const result = await userRepo.remove(user);
      return res.status(200).json({
        message: "User deleted successfully!",
        user: result,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "User deletion failed!",
      error: error,
    });
  }
};
