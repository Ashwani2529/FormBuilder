const express = require("express");
const router = express.Router();
const Category = require("../schemas/category.js");
const Cloze = require("../schemas/cloze.js");
const Comprehension = require("../schemas/comprehension.js");
const Form = require("../schemas/form.js");

const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  responses:{type: Object,required:false},
});

const Response = mongoose.model('Response', responseSchema);

const saveCategoryQuestions = async (categoryQuestions) => {
  const ids = [];
  for (const ques of categoryQuestions) {
    const newQues = Category({
      category: ques.category,
      item: ques.title,
    });
    const savedQues = await newQues.save();
    ids.push(savedQues._id);
  }
  return ids;
};

// Function to save Cloze questions
const saveClozeQuestions = async (clozeQuestions) => {
  const ids = [];
  const newQues = Cloze({
    sentence: clozeQuestions.sentence,
    words: clozeQuestions.options,
  });
  const savedQues = await newQues.save();
  ids.push(savedQues._id);
  return ids;
};

// Function to save Comprehension questions
const saveComprehensionQuestions = async (comprehensionQuestions, passage) => {

  const ids = [];
  console.log(comprehensionQuestions);
  for (const ques of comprehensionQuestions) {
    const newQues = Comprehension({
      passage: passage,
      question: ques.question,
      options: ques.options,
    });
    const savedQues = await newQues.save();
    ids.push(savedQues._id);
  }
  return ids;
};

 // Main route to handle form submission and save data to MongoDB
router.post("/saveForms", async (req, res) => {
  try {
    const { comprehension, cloze, category } = req.body;
    const categoryIds = await saveCategoryQuestions(category.items);
    const clozeIds = await saveClozeQuestions(cloze);
    const comprehensionIds = await saveComprehensionQuestions(
      comprehension.updatedQuestions,
      comprehension.passage
    );
    const newForm = Form({
      Category: categoryIds,
      Cloze: clozeIds,
      Comprehension: comprehensionIds,
    });
    const savedFrom = await newForm.save();
    return res
      .status(201)
      .json({ message: "Form data saved successfully", savedFrom: savedFrom });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

//fetchform_to_render.jsx

router.get('/getForm', async (req, res) => {
  try {
    const formData = await Form.find().populate('Category').populate('Cloze').populate('Comprehension');
    // console.log(formData);
    res.json(formData);
  } catch (err) {
    console.error('Error fetching form data:', err);
    res.status(500).json({ error: 'Error fetching form data' });
  }
});
router.post('/saveresp', async (req, res) => {
  const { responses } = req.body;
  // console.log( "response" , responses);
  const newResponse = new Response({ responses });
  // console.log("newresponse: " , newResponse)
  const savedResp=await newResponse.save();
  // console.log(savedResp)
  res.json({data: savedResp.responses })
});

module.exports = router;
