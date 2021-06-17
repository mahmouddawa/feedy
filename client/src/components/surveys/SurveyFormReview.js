import React from "react";

const SurveyFormReview = ({ onCancel }) => {
  return (
    <div>
      <h5>confirm your entries</h5>
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
    </div>
  );
};

export default SurveyFormReview;

// when we use the back buttom the redux-form will dump all the form data in memory
//this make sense so the use when he come back to the form he will find a new form
