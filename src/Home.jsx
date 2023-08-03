import React, { useState } from "react";
import "./index.css";
import Category from "./components/Category";
import Comprehension from "./components/Comprehension";
import Cloze from "./components/Cloze";
import Render from "./Render";

const Home = () => {
  const [finalForm, setFinalForm] = useState({
    category: null,
    cloze: null,
    comprehension: null,
  });
  const handleSaveForm = async () => {
    console.log(finalForm);
    try {
      const resp = await fetch("http://localhost:5000/saveForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalForm),
      });
      const result = await resp.json();
      // setFinalForm(result);
      console.log(result);
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
      {finalForm ? (
        <Render finalForm={finalForm} />
      ) : (
        <p>No form data to render.</p>
      )}
    </>
  );
};

export default Home;
