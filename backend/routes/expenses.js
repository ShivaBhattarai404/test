const express = require("express");

const isAuth = require("../middleware/is_auth");
const hasLabel = require("../middleware/has_label");
const expensesController = require("../Controllers/Expenses");

const router = express.Router();

router.get("/expenses/:labelId", isAuth, expensesController.getExpenses);
router.put("/expense", isAuth, hasLabel, expensesController.addExpense);
router.delete("/expense", isAuth, hasLabel, expensesController.deleteExpense);

const labelController = require("../Controllers/Labels");

router.get("/labels", isAuth, labelController.getLabels);
router.put("/label", isAuth, labelController.addLabel);
router.patch("/label", isAuth, hasLabel, labelController.editLabel);
router.delete("/label", isAuth, hasLabel, labelController.deleteLabel);

module.exports = router;

