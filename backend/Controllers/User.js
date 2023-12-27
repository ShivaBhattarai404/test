const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator")

const User = require("../Model/User");

exports.signUp = async (req, res, next) => {
  const error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(422).json({message: "Validation Error", error: error.array().map(error => error.msg)})
  }
  const username = req.body.username;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      name: name,
      email: email,
      password: hashedPw,
      expenses: [],
    });

    const responseUser = await user.save();
    return res
      .status(201)
      .json({ message: "User created successfully", user: {name: responseUser.name, email: responseUser.email, id: responseUser._id} });
  } catch (error) {
    return next(error);
  }
};
