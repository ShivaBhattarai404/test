const {Router} = require("express");
const userController = require("../Controllers/User");

const router = Router();

router.get("/login", userController.getLogin);

module.exports = router;