const express = require("express");
const { body } = require("express-validator");

const User = require("../Model/User");
const userController = require("../Controllers/User");

const router = express.Router();

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Please enter a valid email"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password should be 6 characters long"),
  ],
  userController.login
);

router.put(
  "/signup",
  [
    body("name").not().isEmpty().withMessage("Name should not be empty"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("Email already exits");
        }
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password should be 6 characters long"),
  ],
  userController.signUp
);

module.exports = router;
