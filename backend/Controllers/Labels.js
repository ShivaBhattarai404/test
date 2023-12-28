const Expenses = require("../Model/Expenses");
const User = require("../Model/User");
const Label = require("../Model/Labels");

exports.getLabels = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate("labels");
    if (user.labels.length === 0) {
      return res.status(404).json({ message: "No labels found", labels: [] });
    }
    res.status(200).json({ message: "Labels Found", labels: user.labels });
  } catch (error) {
    return next(error);
  }
};

exports.addLabel = async (req, res, next) => {
  const name = req.body.name;
  const budget = req.body.budget;

  const newLabel = new Label({
    name: name,
    budget: budget,
    expenses: [],
  });
  try {
    const label = await newLabel.save();
    const user = await User.findById(req.userId);
    user.labels.push(label._id);
    await user.save();

    res.status(201).json({ message: "Label added", addedLabel: label });
  } catch (error) {
    return next(error);
  }
};

exports.editLabel = async (req, res, next) => {
  const name = req.body.name;
  const budget = req.body.budget;

  try {
    req.label.name = name || req.label.name;
    req.label.budget = budget || req.label.budget;
    const updatedLabel = await req.label.save();
    res
      .status(201)
      .json({ message: "Label Updated Successfully", label: updatedLabel });
  } catch (error) {
    error.message = "Label doesnot match";
    error.status = error.status || 400;
    return next(error);
  }
};

exports.deleteLabel = async (req, res, next) => {
  const labelId = req.label._id;

  try {
    // delete expenses of that label
    await Expenses.deleteMany({ label: labelId });

    // delete label from user record
    const user = await User.findById(req.userId);
    user.labels = user.labels.filter((label) => label !== labelId);
    await user.save();

    // delete label from label collection
    const label = await Label.findByIdAndDelete(labelId);

    res
      .status(200)
      .json({ message: "Label deleted successfully", label: label });
  } catch (error) {
    return next(error);
  }
};
