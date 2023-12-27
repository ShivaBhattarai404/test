const { Schema, default: mongoose } = require("mongoose");
const Expenses = require("./Expenses");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  expenses: [{ type: Schema.ObjectId, ref: Expenses }],
});

module.exports = mongoose.model("User", UserSchema);