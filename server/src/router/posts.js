import { Router } from "express";
import { Post } from "../models";
import { PostRules } from "../validations";
import { userAuth } from "../middlewares/auth.guard";
import validator from "../middlewares/validationMiddleware";

const router = Router();

/**
 * @description Api to create a post
 * @api '/api/posts'
 * @access private
 * @type POST
 */
router.post("/", userAuth, PostRules, validator, async (req, res) => {
  try {
    let post = await Post.create({ ...req.body, author: req.user._id });
    return res.status(201).json({
      post,
      success: true,
      message: "Posts created successfully.",
    });
  } catch (err) {
    console.log("POST_CREATE_ERR", err.message);
    return res.status(500).json({
      success: false,
      message: "Post not created.",
    });
  }
});

/**
 * @description Api to create a post
 * @api '/api/posts'
 * @access private
 * @type GET
 */
router.get("/:id", async (req, res) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found.",
    });
  }
  return res.status(200).json(post);
});

/**
 * @description Api to edit a post
 * @api '/api/posts'
 * @access private
 * @type PUT
 */
router.put("/:id", userAuth, PostRules, validator, async (req, res) => {
  try {
    let post = await Post.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user._id.toString(),
      },
      { ...req.body },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }
    return res.status(200).json({
      post,
      success: true,
      message: "Post updated.",
    });
  } catch (err) {
    console.log("POST_UPDATE_ERR", err.message);
    return res.status(500).json({
      success: false,
      message: "Post not deleted.",
    });
  }
});

/**
 * @description Api to delete a post
 * @api '/api/posts'
 * @access private
 * @type DELETE
 */
router.delete("/:id", userAuth, async (req, res) => {
  try {
    let post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id.toString(),
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post deleted.",
    });
  } catch (err) {
    console.log("POST_DELETE_ERR", err.message);
    return res.status(500).json({
      success: false,
      message: "Post not deleted.",
    });
  }
});

export default router;
