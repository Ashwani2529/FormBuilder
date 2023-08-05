import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Render.css";
import { useNavigate } from "react-router-dom";


const Render = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState([]);
  const [comprehensionAnswers, setComprehensionAnswers] = useState({});
  const [categoryAnswers,setCategoryAnswers]=useState();
    const [formedSentence, setFormedSentence] = useState("");
  const [clozeSentenceArr, setClozeSentenceArr] = useState([]);
 
  const handleSaveResponses = async() => {
    const allResponses = {
      comprehensionAnswers,
      categoryAnswers,
      formedSentence,
    };
    // console.log("all responses: ",allResponses);
  
   const res= await fetch("http://localhost:5000/saveresp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({responses:allResponses}),
    });
    // eslint-disable-next-line
      const data=await res.json();
      // console.log("dataaaa: ",data);
     navigate("/submit");
  };
  
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getForm");
        // console.log(response);
        setFormData(response.data);
        setClozeSentenceArr(response.data[0].Cloze[0].sentence.split(" "));
        response.data[0].Category.map((cat, ind) => {
          // console.log(cat.item, response.data[0].Category[ind].category);
          setCategoryAnswers((prevState) => ({
            ...prevState,
            [cat.item]: response.data[0].Category[ind].category,
          }));
          // Add the return statement here
          return null;
        });
        setFormedSentence(response.data[0].Cloze[0].sentence);
        response.data[0].Comprehension.map((ques, ind) => {
          // console.log(ques.question);
          setComprehensionAnswers((prevState) => ({
            ...prevState,
            [ques.question]: null,
          }));
          // Add the return statement here
          return null;
        });
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();
    // eslint-disable-next-line
  }, []);
  

  
  const handleSelectOption = (question, selectedOption) => {
    setComprehensionAnswers((prevState) => ({
      ...prevState,
      [question]:selectedOption,
    }));
  };

  const handleSelectChange = (event, word, index) => {
    const updatedSentenceArr = [...clozeSentenceArr];
    updatedSentenceArr[index] = event.target.value;
    setClozeSentenceArr(updatedSentenceArr);
    setFormedSentence(updatedSentenceArr.join(" "));
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
<h2 className=" my-5">Comprehension</h2>
<p className="passage">{formPart.Comprehension[0].passage}</p>
            {formPart.Comprehension.map((question, questionIndex) => ( 
              <div className="comprehension my-4" key={questionIndex}>
               

                <p>Question {questionIndex+1+": "+question.question}</p>
                <div className="some">
                  <ul>
                    {question.options.map((option, optionIndex) => (
                      <div  key={optionIndex}>
                        <label className="mx-3">
                          <input 
                            type="radio"
                            name={`question-${questionIndex}`}
                            // checked={formPart.selectedOption === optionIndex}
                            onChange={() =>
                              handleSelectOption(question.question,option)
                            }
                          />
                        {" " +option}
                        </label>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ))}
        
        <button className="btn btn-primary my-3" onClick={handleSaveResponses}>Save</button>
      </div>
      
  );
};

export default Render;