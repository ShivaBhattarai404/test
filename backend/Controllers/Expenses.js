const Expenses = require("../Model/Expenses");
const User = require("../Model/User");

exports.getExpenses = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate('expenses');
    res.status(200).json({ expenses: user.expenses });
  } catch (error) {
    return next(error);
  }
};

exports.addExpense = async (req, res, next) => {
  const name = req.body.name;
  const amount = req.body.amount;

  const newExpense = new Expenses({
    name: name,
    amount: amount,
  });
  try {
    const expense = await newExpense.save();
    const user = await User.findById(req.userId);
    const updatedExpenses = [...user.expenses, expense._id];
    user.expenses = updatedExpenses;
    await user.save();
    res.status(201).json({ message: "Expense added", expense: expense });
  } catch (error) {
    return next(error);
  }
};

exports.deleteExpense = async (req, res, next) =>{
    const expenseId = req.body.id;
    const user = await User.findById(req.userId);

    const updatedExpenses = user.expenses.filter(expense => expense._id.toString() !== expenseId.toString());
    user.expenses = updatedExpenses;
    await user.save();
    
    const expense = await Expenses.findByIdAndDelete(expenseId);
    const updatedUser = await User.findById(req.userId).populate('expenses');
    res.status(200).json({message: "expense deleted successfully", expenses: updatedUser.expenses});
}