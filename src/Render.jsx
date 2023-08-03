import React from "react";

const Render = ({ finalForm }) => {
  const { category, cloze, comprehension } = finalForm;

  return (
    <div>
      <h1>Form Render</h1>
      <div className="form-container my-4">
        <div className="form-section my-2">
          <h2>Question 1</h2>
          <h3>Categories The Followings</h3>
          <h5>Categories</h5>
          <p>{category.categories.join(", ")}</p>
        </div>
        <div className="form-section my-3">
          <h3>Items</h3>
          <div className="items-container my-2">
            {category.items.map((item, index) => (
              <div key={item.id} className="item mx-3 my-0">
                <p>{item.title}</p>
                <p>Category: {item.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cloze-container my-5">
        <h2>Question 2</h2>
        <div className="cloze-section my-4">
          <label htmlFor="sentence">Sentence:</label>
          <textarea
            id="sentence"
            value={cloze.sentence}
            readOnly
            placeholder="Type the full sentence or paragraph normally"
          ></textarea>
          <h3 className="my-3">Options</h3>
          <div className="options-container">
            {cloze.options.map((option) => (
              <div key={option} className="option my-3">
                <p>{option}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehension Form Data */}
      <div className="comprehension-container my-5">
        <h2>Question 3</h2>
        <div>
          <div className="passage-section">
            <h3>Passage</h3>
            <textarea
              value={comprehension.passage}
              readOnly
              placeholder="Enter the passage for the comprehension"
            ></textarea>
          </div>
          <div className="questions-section">
            <h3>Questions</h3>
            {comprehension.questions.map((question, index) => (
              <div key={index} className="question">
                <h4>Question {index + 1}</h4>
                <p>Type: {question.type}</p>
                <p>Question: {question.question}</p>
                <div>
                  <h5>Options</h5>
                  {question.options.map((option, optionIndex) => (
                    <p key={optionIndex}>
                      Option {optionIndex + 1}: {option}
                    </p>
                  ))}
                  <p>Correct Answer: Option {question.correctAnswer + 1}</p>
                </div>
                <p>Points for the right answer: {question.points}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Render;
