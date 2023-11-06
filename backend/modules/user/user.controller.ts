import { User } from "../../entities/user";
import { AppDataSource } from "../../database/dbConnect";
const bcrypt = require("bcrypt");
import { UserService } from "./UserService";
import { userValidatorSchema } from "./validations";
import { ValidationError } from "joi";
const passport = require("passport");

const userRepo = AppDataSource.getRepository(User);

const userService = new UserService();

export const login = async (req: any, res: any, next: any) => {
  passport.authenticate(
    "local",
    (err: Error, user: User, info: { message: string }) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).send({ message: info.message });
      }

      req.logIn(user, (err: Error) => {
        if (err) {
          return next(err);
        }

        return res.redirect("/");
      });
    }
  )(req, res, next);
};
export const logout = (req: any, res: any, next: any) => {
  req.logout(function (err: Error) {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
};

export const signup = async (req: any, res: any) => {
  try {
    await userValidatorSchema.validateAsync(req.body);
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

    return res
      .status(200)
      .json({ message: "User created successfully", user: result });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
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
      await userValidatorSchema.validateAsync(req.body);
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
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
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
