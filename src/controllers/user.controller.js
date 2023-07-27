import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
   try {
      const { username, password, displayName } = req.body;

      const checkUser = await userModel.findOne({ username });

      if (checkUser) {
         return responseHandler.badrequest(res, "User already exists");
      }
      const user = new userModel();
      user.displayName = displayName;
      user.username = username;
      user.setPassword(password);

      await user.save();
      const token = jsonwebtoken.sign(
         { data: user._id },
         process.env.TOKEN_SECRET,
         { expiresIn: "24h" }
      );
      responseHandler.created(res, {
         token,
         ...user._doc,
         id: user.id,
      });
   } catch (error) {
      responseHandler.error(res);
   }
};

const signin = async (req, res) => {
   try {
      const { username, password } = req.body;

      const user = await userModel
         .findOne({ username })
         .select("username password salt display name");

      if (!user) {
         return responseHandler.badrequest(res, "User not exist");
      }
      if (!user.validpassword(password)) {
         return responseHandler.badrequest(res, "Wrong password");
      }

      const token = jsonwebtoken.sign(
         { data: user._id },
         process.env.TOKEN_SECRET,
         { expiresIn: "24h" }
      );

      user.password = undefined;
      user.salt = undefined;

      responseHandler.created(res, {
         token,
         ...user._doc,
         id: user.id,
      });
   } catch (error) {
      responseHandler.error(res);
   }
};

const updatePassword = async (req, res) => {
   try {
      const { password, newPassword } = req.body;

      const user = await userModel.findById(req.user.id).select("password");

      if (!user) {
         return responseHandler.unauthoriza(res);
      }
      if (!user.validpassword(password)) {
         return responseHandler.badrequest(res, "Wrong password");
      }
      user.setPassword(newPassword);

      await user.save();
      responseHandler.ok(res);
   } catch (error) {
      responseHandler.error(res);
   }
};

const getInfo = async (req, res) => {
   try {
      const user = await userModel.findById(req.user.id);
      if (!user) {
         return responseHandler.unauthoriza(res);
      }

      responseHandler.ok(res, user);
   } catch (error) {
      responseHandler.error(res);
   }
};

export default {
   signup,
   signin,
   updatePassword,
   getInfo,
};
