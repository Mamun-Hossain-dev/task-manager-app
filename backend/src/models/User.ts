import { IUser, Role } from "./../interfaces/user.interface";
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.User,
    },
  },
  {
    timestamps: true,
  }
);

// password hashing
userSchema.pre<IUser>("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// password comparison
userSchema.methods.comparePassword = async function (
  givenPassword: string
): Promise<boolean> {
  return bcrypt.compare(givenPassword, this.password);
};

const User = model<IUser>("user", userSchema);
export default User;
