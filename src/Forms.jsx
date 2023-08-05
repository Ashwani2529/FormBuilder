import React from 'react';
let i=1;
const Forms = () => {
  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4 box-shadow">
              <img
                className="card-img-top"
                src="https://source.unsplash.com/collection/diary/198x225"
                alt=""
                style={{ height: '225px', width: '100%', display: 'block' }}
              />
              <div className="card-body">
                <p className="card-text">
                  {`Form ${i}`}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 box-shadow">
              <img
                className="card-img-top"
                src="https://source.unsplash.com/collection/forms/198x225"
                alt=""
                style={{ height: '225px', width: '100%', display: 'block' }}
              />
              <div className="card-body">
                <p className="card-text">
                {`Form ${i+1}`}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 box-shadow">
              <img
                className="card-img-top"
                src="https://source.unsplash.com/collection/book/198x225"
                alt=""
                style={{ height: '225px', width: '100%', display: 'block' }}
              />
              <div className="card-body">
                <p className="card-text">
                {`Form ${i+2}`}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Forms;
