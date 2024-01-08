const { validationResult } = require("express-validator");

const Expenses = require("../Model/Expenses");
const Label = require("../Model/Labels");

exports.getExpenses = async (req, res, next) => {
  const labelId = req.params.labelId;
  try {
    const label = await Label.findById(labelId).populate("expenses");
    res
      .status(200)
      .json({
        label: { name: label.name, budget: label.budget, id: label._id },
        expenses: label.expenses,
      });
  } catch (error) {
    error.message = "Invalid label Id";
    error.status = 400;
    return next(error);
  }
};

exports.addExpense = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const error = new Error("Validation Error");
    error.status = 403;
    error.data = validationErrors.array().map((err) => err.msg);
    return next(error);
  }
  const name = req.body.name;
  const amount = req.body.amount;

  const expense = new Expenses({
    name: name,
    amount: amount,
    label: req.label._id,
  });
  try {
    const uploadedExpense = await expense.save();
    req.label.expenses.push(uploadedExpense);
    req.label.totalExpense += uploadedExpense.amount;
    await req.label.save();
    res
      .status(201)
      .json({ message: "Expense added", expense: uploadedExpense });
  } catch (error) {
    return next(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  const expenseId = req.body.id;
  try {
    // delete expense from expenses collection
    const expense = await Expenses.findByIdAndDelete(expenseId);

    // remove expense from its label
    req.label.expenses = req.label.expenses.filter(
      (expense) => expense.toString() !== expenseId.toString()
    );
    req.label.totalExpense -= expense.amount;
    await req.label.save();

    res.status(200).json({
      message: "expense deleted successfully",
      deletedExpense: expense,
    });
  } catch (error) {
    error.message = "Invalid Expense Id";
    error.status = 400;
    return next(error);
  }
};
