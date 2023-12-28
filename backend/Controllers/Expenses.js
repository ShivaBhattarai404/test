const Expenses = require("../Model/Expenses");
const Label = require("../Model/Labels");

exports.getExpenses = async (req, res, next) => {
  const labelId = req.params.labelId;
  try {
    const label = await Label.findById(labelId).populate("expenses");
    res.status(200).json({ expenses: label.expenses });
  } catch (error) {
    error.message = "Invalid label Id";
    error.status = 400;
    return next(error);
  }
};

exports.addExpense = async (req, res, next) => {
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
    // remove expense from its label
  req.label.expenses = req.label.expenses.filter((expense) => expense !== expenseId);
  await req.label.save();

  // delete expense from expenses collection
  const expense = await Expenses.findByIdAndDelete(expenseId);

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
