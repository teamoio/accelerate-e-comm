const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
import { UserService } from "../modules/user/UserService";

const userService = new UserService();

const passportInitialize = (passport: any) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email: any, password: any, done: any) => {
        try {
          const user = await userService.findByEmail(email);
          console.log(user);
          if (!user) {
            return done(null, false, { message: "Invalid email" });
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          console.log(isPasswordValid);
          if (!isPasswordValid) {
            return done(null, false, { message: "Invalid password" });
          }
          return done(null, user);
        } catch (error) {
          return done(error, false, {
            message: "Error while authenticating user",
          });
        }
      }
    )
  );
  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: any, done: any) => {
    try {
      const user = await userService.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export { passportInitialize };
