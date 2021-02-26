import { Router } from "express";
import { User } from "../models";
import { userAuth } from "../middlewares/auth.guard";
import { RegisterRules, LoginRules } from "../validations";
import validator from "../middlewares/validationMiddleware";

const router = Router();

/**
 * @description Api to register (sign-up) a new user
 * @api '/api/users/register'
 * @access public
 * @type POST
 */
router.post("/register", RegisterRules, validator, async (req, res) => {
  try {
    let { body } = req;
    // Check if the email is already registred
    let user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered.",
      });
    }
    // Check if the username is already taken
    user = await User.findOne({ username: body.username });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken.",
      });
    }

    // Create a new user
    user = await User.create(body);
    user = user.serializeUser();
    return res.status(201).json({
      success: true,
      message: "You are now registred.",
    });
  } catch (err) {
    console.log("ERR", err.message);
    return res.status(500).json({
      success: false,
      message: "An error occured while signup.",
    });
  }
});

/**
 * @description Api to authenticate (sign-in) an user
 * @api '/api/users/authenticate'
 * @access public
 * @type POST
 */
router.post("/login", LoginRules, validator, async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Username is not found.",
      });
    }
    // Compare the password
    let isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    let token = await user.signJWT();

    return res.status(200).json({
      token,
      success: true,
      message: "You are now logged in.",
    });
  } catch (err) {
    console.log("ERR", err.message);
    return res.status(500).json({
      success: false,
      message: "An error occured while signin.",
    });
  }
});

/**
 * @description Api to get authenticated user
 * @api '/api/users/authenticate'
 * @access private
 * @type GET
 */
router.get("/authenticate", userAuth, async (req, res) => {
  return res.json(req.user);
});

export default router;
