import { Document } from "mongoose";

export enum Role {
  Admin = "admin",
  User = "user",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  comparePassword(givenPassword: string): Promise<boolean>;
}
