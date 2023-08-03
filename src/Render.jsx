import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Render = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {   
    const fetchFormData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getForm');
        console.log(response)
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, []);

  return (
    <div>
      {formData.map((formPart, index) => (
        <div key={index}>
          {formPart.Category && (
            <div>
              <h2>Category</h2>
              <ul>
                {formPart.Category.map((categoryItem) => (
                  <li key={categoryItem._id}>
                    <h3>Category: {categoryItem.category}</h3>
                    <p>Item: {categoryItem.item}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {formPart.Cloze && (
            <div>
              <h2>Cloze</h2>
              <h3>Sentence: {formPart.Cloze[0].sentence}</h3>
              <h3>Options:</h3>
              <ul>
                {formPart.Cloze[0].words.map((option, index) => (
                  <li key={index}>Option {index + 1}: {option}</li>
                ))}
              </ul>
            </div>
          )}

          {formPart.Comprehension && (
            <div>
              <h2>Comprehension</h2>
              <h3>Passage:</h3>
              <p>{formPart.Comprehension[0].passage}</p>
              <h3>Questions:</h3>
              <ul>
                {formPart.Comprehension.map((question, index) => (
                  <li key={index}>
                    <h4>Question {index + 1}</h4>
                    <p>Type: {question.type}</p>
                    <p>Question: {question.question}</p>
                    <h5>Options:</h5>
                    <ul>
                      {question.options.map((option, optionIndex) => (
                        <li key={optionIndex}>Option {optionIndex + 1}: {option}</li>
                      ))}
                    </ul>
                    <p>Correct Answer: Option {question.correctAnswer + 1}</p>
                    <p>Points for the right answer: {question.points}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Render;
