import { check } from "express-validator";

const title = check("title", "Title of the post is required.").not().isEmpty();
const content = check("content", "Content of the post is required.")
  .not()
  .isEmpty();

export const PostRules = [title, content];
