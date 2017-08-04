import mongoose = require("mongoose");
import { Document, Model } from "mongoose";
import { IUser as UserInterface } from '../interfaces/user';
import { userSchema } from "../schemas/user"
export interface UserModel extends UserInterface, Document { }
export interface UserModelStatic extends Model<UserModel> { }
export interface IUserModel extends UserInterface, Document {
  //custom methods for your model would be defined here
}
export const User = mongoose.model<UserModel, UserModelStatic>("User", userSchema)