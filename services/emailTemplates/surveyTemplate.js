const keys = require("../../config/keys");

module.exports = (survey) => {
  return `
    <html>
    <body>
    <div style= "text-align: center;">
      <h3> i would like to have your input </h3>
      <p>please answer the following question: </p>
      <p>${survey.body}</p>
      <div>
       <a href="${keys.redirectDomain}/api/surveys/yes"> Yes </a>
      </div>
      <div>
        <a href="${keys.redirectDomain}"> No </a>
     </div>
    </div>
    <body>
    </html>
  `;
};

// you can search for a better looking body templates later
