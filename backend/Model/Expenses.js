const {default: mongoose, Schema} = require("mongoose");

const expenseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
})

module.exports = mongoose.model("Expenses", expenseSchema)