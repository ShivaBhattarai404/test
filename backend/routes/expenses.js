const express = require("express");

const isAuth = require("../middleware/is_auth");
const expensesController = require("../Controllers/Expenses");

const router = express.Router();

router.get("/expenses", isAuth, expensesController.getExpenses);
router.put("/expense", isAuth, expensesController.addExpense);
router.delete("/expense", isAuth, expensesController.deleteExpense);

module.exports = router;

