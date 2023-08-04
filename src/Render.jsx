import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Render.css";


const Render = () => {
  const [formData, setFormData] = useState([]);
  const [categoryAnswers,setCategoryAnswers]=useState();
  const [clozeSentenceArr, setClozeSentenceArr] = useState([]);
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getForm");
        console.log(response);
        setFormData(response.data);
        setClozeSentenceArr(response.data[0].Cloze[0].sentence.split(" "));
        setCategoryAnswers(...categoryAnswers,response.data[0].Category.map((cat)=>cat.item))
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();
  }, []);

  const [formedSentence, setFormedSentence] = useState("");

  const handleSelectOption = (questionIndex, optionIndex) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[questionIndex].selectedOption = optionIndex;
      return updatedFormData;
    });
  };

  const handleSelectChange = (event, word,index) => {
    const updatedSentenceArr = [...clozeSentenceArr];
    updatedSentenceArr[index] = event.target.value;
    setClozeSentenceArr(updatedSentenceArr)
    setFormedSentence(updatedSentenceArr.join(' '));
  
  };
  return (
      <div className="form-container my-2">
        {formData.map((formPart, index) => (
          <div key={index} className="form-part my-5">
            {formPart.Category && (
              <div className="category my-4">
                <h2>Category</h2>
                <ul>
                  {formPart.Category.map((categoryItem) => (
                    <div key={categoryItem._id} className="category-item">
                      <p>Item: {categoryItem.item}</p>
                      <label htmlFor={`category-select-${categoryItem._id}`}>
                        Select Category:
                      </label>
                      <select id={`category-select-${categoryItem._id}`}>
                        {formPart.Category.map((categoryOption) => (
                          <option
                            key={categoryOption._id}
                            value={categoryOption.category}
                          >
                            {categoryOption.category}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </ul>
              </div>
            )}

            {formPart.Cloze && (
              <div className="cloze">
                {" "}
                <h2>Cloze</h2>{" "}
                <h3
                  
                >
                  {clozeSentenceArr.map((word,ind) => {
                    return (
                      <span>
                        {!formPart.Cloze[0].words.includes(word) ? (
                          word + " "
                        ) : (
                          <span>
                            <select

                              onChange={(event) =>
                                handleSelectChange(
                                  event,
                                  word,
                                  ind
                                )
                              }
                            >
                              {" "}
                              {formPart.Cloze[0].words.map((option, index) => (
                                <option key={index}>{option}</option>
                              ))}{" "}
                            </select>
                          </span>
                        )}
                      </span>
                    );
                  })}
                </h3>{" "}
                <div>
                  <h3>Formed Sentence:</h3>
                  <p>{formedSentence}</p>
                </div>
              </div>
            )}

            {formPart.Comprehension.map((question, questionIndex) => (
              <div className="comprehension my-5" key={questionIndex}>
                <h2>Comprehension</h2>

                <p>Question {questionIndex+1+": "+question.question}</p>
                <div className="some">
                  <ul>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <label>
                          <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            checked={formPart.selectedOption === optionIndex}
                            onChange={() =>
                              handleSelectOption(questionIndex, optionIndex)
                            }
                          />
                          Option {optionIndex + 1}: {option}
                        </label>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
  );
};

export default Render;