const _ = require("lodash");
const {Path} = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("survey");

module.exports = (app) => {
  app.get("/api/surveys/yes", (req, res) => {
    res.send("thank you for the feedback! ");
  });
  const p = new Path('/api/surveys/:surveyId/:choice');
  
  app.post("/api/surveys/webhooks", (req, res) => {
    const events = _.chain(req.body)
      .map( ({email,url})=>{
        const match = p.test(new URL(url).pathname) ;
        if(match){
          return {email, surveyId: match.surveyId, choice: match.choice}
        }
      })
      .compact()
      .unionBy('email', 'surveyId')
      .value();
    console.log(events);
    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = await new Survey({
      title,
      body,
      subject,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })), // why the return value is ({}) read down
      _user: req.user.id,
      dateSent: Date.now(),
    });
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422);
    }
  });
};

// i can require Survey directly, but still i might get some errors "related to mongoose" if i added test
// to this file => retest this issue later

// i used the ({}) to tell the interpreter that i want to return an object like {email:email}
// otherwise it will get confused if i wrote onley {email} it will think inside of the {} is a function call



// app.post("/api/surveys/webhooks", (req, res) => {
//   const events = _.map(req.body, ({email,url})=>{
//     const pathname = new URL(url).pathname;
//     const match = p.test(pathname) ;
//     if(match){
//       return {email, surveyId: match.surveyId, choice: match.choice}
//     }
//   });
//   //remove all undefined objects
//   const compactEvents = _.compact(events);
//   //remove duplicate with two keys(email and surveyId combined)
//   const uniqueEvents = _.unionBy(compactEvents, 'email', 'surveyId');
//   console.log(uniqueEvents);
//   res.send({});
// });