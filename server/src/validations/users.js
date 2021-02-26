import { check } from "express-validator";

const name = check("name", "Name is required.").not().isEmpty();
const username = check("username", "Username is required.").not().isEmpty();
const password = check(
  "password",
  "Minimum Password of 6 characters is required."
).isLength({
  min: 6,
});
const email = check("email", "A Valid Email is required.").isEmail();

export const RegisterRules = [name, username, email, password];
export const LoginRules = [username, password];
