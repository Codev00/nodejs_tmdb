import mongoose from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
      },
      displayName: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
         select: false,
      },
      salt: {
         type: String,
         required: true,
         select: false,
      },
   },
   modelOptions
);

userSchema.methods.setPassword = (password) => {
   this.salt = crypto.randomBytes(16).toString("hex");
   this.password = crypto
      .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
      .toString("hex");
};

userSchema.methods.validPassword = (password) => {
   const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
      .toString("hex");
   return hash === this.password;
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
