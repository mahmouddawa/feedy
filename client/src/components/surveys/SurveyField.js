import React from "react";

export default ({ input, label }) => {
  console.log(input);
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};

//<input {...input} /> adding the {...input} means to pass all the properties that are
//provided on the props.input
