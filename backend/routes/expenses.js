const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middleware/is_auth");
const hasLabel = require("../middleware/has_label");
const expensesController = require("../Controllers/Expenses");
const labelController = require("../Controllers/Labels");

const router = express.Router();

router.get("/expenses/:labelId", isAuth, expensesController.getExpenses);
router.put(
  "/expense",
  isAuth,
  hasLabel,
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Expense name should not be empty"),
    body("amount")
      .isNumeric()
      .withMessage("Expense amount should be a numeric value")
      .custom((value, { req }) => {
        if (value < 0) {
          return Promise.reject("Expense amount should not be negative");
        }
      }),
  ],
  expensesController.addExpense
);
router.delete("/expense", isAuth, hasLabel, expensesController.deleteExpense);

router.get("/labels", isAuth, labelController.getLabels);
router.put(
  "/label",
  isAuth,
  [
    body("name").not().isEmpty().withMessage("Label name should not be empty"),
    body("budget")
      .isNumeric()
      .withMessage("Label budget should be a numeric value")
      .custom((value, { req }) => {
        if (value < 0) {
          return Promise.reject("Label budget should not be negative");
        }
      }),
  ],
  labelController.addLabel
);
router.patch(
  "/label",
  isAuth,
  hasLabel,
  [
    body(),
    body("name").not().isEmpty().withMessage("Label name should not be empty"),
    body("budget")
      .isNumeric()
      .withMessage("Label budget should be a numeric value")
      .custom((value, { req }) => {
        if (value < 0) {
          return Promise.reject("Label budget should not be negative");
        }
      }),
  ],
  labelController.editLabel
);
router.delete("/label", isAuth, hasLabel, labelController.deleteLabel);

module.exports = router;
