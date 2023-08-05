const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  Category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  }],
  Cloze: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cloze", 
  }],
  Comprehension: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comprehension",
  }],
});

const Form = mongoose.model("Form", FormSchema);
module.exports = Form;
