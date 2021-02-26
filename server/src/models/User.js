import { sign } from "jsonwebtoken";
import { SECRET } from "../constants";
import { Schema, model } from "mongoose";
import { compare, hash } from "bcryptjs";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://image.flaticon.com/icons/png/512/149/149071.png",
    },
  },
  { timestamps: true }
);

// To Hash the Password
UserSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  this.password = await hash(user.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await compare(this.password, password);
};

UserSchema.methods.signJWT = async function () {
  let payload = {
    _id: this._id,
    name: this.name,
    email: this.email,
    username: this.username,
  };
  return await sign(payload, SECRET, { expiresIn: "2 days" });
};

const User = model("users", UserSchema);
export default User;
