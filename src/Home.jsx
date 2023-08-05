import React, { useState } from "react";
import "./index.css";
import Category from "./components/Category";
import Comprehension from "./components/Comprehension";
import Cloze from "./components/Cloze";

const Home = () => {
  const [finalForm, setFinalForm] = useState({
    category: null,
    cloze: null,
    comprehension: null,
  });
  const handleSaveForm = async () => {
    // console.log(finalForm);
    try {
      const resp = await fetch("http://localhost:5000/saveForms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalForm),
      });
      // resp.send();
      
      const result = await resp.json();
      setFinalForm(result);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="container">
        <h1>WELCOME TO FORMBUILDER</h1>
      </div>
      <Category key="category" setFinalForm={setFinalForm} />
      <Cloze key="cloze" setFinalForm={setFinalForm} />
      <Comprehension key="comprehension" setFinalForm={setFinalForm} />
      <button className="btn btn-info my-3" onClick={handleSaveForm}>
        Save Form{" "}
      </button>
    
    </>
  );
};

export default Home;
