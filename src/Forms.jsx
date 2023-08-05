import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import CircularProgress from '@mui/material/CircularProgress';

// let i = 1;
const Forms = () => {
  // const { id } = useParams();
  const deleteForm=async (formId)=>{
    try{
      // eslint-disable-next-line
      const resp=await fetch(`http://localhost:5000/deleteForm/${formId}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:formId})
      
    })
    getAllForms();
    toast("Form deleted successfully");}catch(err){
      
      console.log(err)}
  }
  
  const navigate = useNavigate();
  const [allForms, setAllForms] = useState([]);
  // const [progressChk, setProgressChk] = useState(false);

  const copyFormLink = async (formId) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/render/${formId}`);
      toast("link copied");
    } catch (err) {
      console.log(err);
    }
  };
  const getAllForms = async () => {
    try {
      const resp = await fetch("http://localhost:5000/getForm", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      setAllForms(data); 
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
getAllForms();
  }, []);

 
  return (
    <div className="album py-1 bg-light">
      <h1 style={{margin:'30px 30px'}}>Forms</h1>
      {/* {(progressChk)?<CircularProgress style={{marginLeft:'100px'}}/>:null} */}
      <div className="container">
        <div className="row">
          {allForms.map((form) => { 
            return <div className="col-md-6">
              <div className="card mb-4 box-shadow mx-3">
                <img
                  className="card-img-top"
                  src="https://source.unsplash.com/collection/nature/198x225"
                  alt=""
                  style={{ height: "225px", width: "100%", display: "block" }}
                />
                <div className="card-body">
                  <p className="card-text"></p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => navigate(`/render/${form._id}`)}
                      >
                        Fill
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => copyFormLink(form._id)}
                      >
                        Copy Link
                      </button>
                    <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => deleteForm(form._id)}
          >
            Delete
          </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>;
          })}
        </div>
        <button onClick={() => navigate("/")}>Create your Form</button>
      </div>
    </div>
  );
};

export default Forms;