import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Render.css";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const Option = ({ option, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.OPTION,
    item: { option },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      className="option"
    >
      {option}
    </div>
  );
};

const EmptyField = ({ onDrop, children }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.OPTION,
    drop: (item) => {
      onDrop(item.option);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return (
    <div ref={drop} className={`empty-field ${isActive ? "active" : ""}`}>
      {children}
    </div>
  );
};

const Render = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getForm");
        console.log(response);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();
  }, []);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [formedSentence, setFormedSentence] = useState("");
  const handleDropOption = (option, index) => {
    // Check if the option is not already used in forming the sentence
    if (!formedSentence.includes(option)) {
      // Concatenate the dropped option to the formed sentence
      setFormedSentence((prevSentence) =>
        prevSentence.length === 0 ? option : prevSentence + " " + option
      );
    }
  };

  const handleSelectOption = (questionIndex, optionIndex) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[questionIndex].selectedOption = optionIndex;
      return updatedFormData;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="form-container">
        {formData.map((formPart, index) => (
          <div key={index} className="form-part">
            {formPart.Category && (
              <div className="category">
                <h2>Category</h2>
                <ul>
                  {formPart.Category.map((categoryItem) => (
                    <div key={categoryItem._id} className="category-item">
                      <p>Item: {categoryItem.item}</p>
                      <label htmlFor={`category-select-${categoryItem._id}`}>Select Category:</label>
                      <select id={`category-select-${categoryItem._id}`}>
                        {formPart.Category.map((categoryOption) => (
                          <option key={categoryOption._id} value={categoryOption.category}>
                            {categoryOption.category}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </ul>
              </div>
            )}

            {/* {formPart.Cloze && ( <div> <h2>Cloze</h2> <h3>Sentence: {clozeSentenceArr.map((word)=>{return <span>{(!formPart.Cloze[0].words.includes(word))?word+" ": <select> {formPart.Cloze[0].words.map((option, index) => ( <option key={index}>{option}</option> ))} </select> }</span>})}</h3> </div> )} */}

            {formPart.Cloze && (
              <div>
                <h2>Cloze</h2>
                <h3>Sentence:</h3>
                <EmptyField onDrop={(option) => handleDropOption(option, index)}>
                  {formPart.Cloze[0].sentence.split(" ").map((word, wordIndex) => (
                    <span key={wordIndex}>
                      {formPart.Cloze[0].words.includes(word) ? (
                        <Option key={wordIndex} option={word} />
                      ) : (
                        <span
                          style={{
                            backgroundColor: activeIndex === wordIndex ? "#f1f3f4" : "transparent",
                            padding: "5px",
                          }}
                        >
                          {word}
                        </span>
                      )}
                      {" "}
                    </span>
                  ))}
                </EmptyField>
                <h3>Options:</h3>
                <div>
                  {formPart.Cloze[0].words.map((option, optionIndex) => (
                    <Option key={optionIndex} option={option} onDrop={() => handleDropOption(option, index)} />
                  ))}
                </div>
              </div>
            )}

            {formPart.Comprehension.map((question, questionIndex) => (
              <div key={questionIndex}>
                <h3>Comprehension</h3>
               
                <p>Question: {question.question}</p>
                {/* <h5>Options:</h5> */}
                <div className="some">
                <ul >
                  {question.options.map((option, optionIndex) => (
                    <div  key={optionIndex}>
                      <label>
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          checked={formPart.selectedOption === optionIndex}
                          onChange={() => handleSelectOption(questionIndex, optionIndex)}
                        />
                        Option {optionIndex + 1}: {option}
                      </label>
                    </div>
                  ))}
                </ul></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </DndProvider>
  );
};

export default Render;
