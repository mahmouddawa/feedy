const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");


const Survey = mongoose.model("survey");

module.exports = (app) => {
  app.get("/api/surveys/yes", (req, res) => {
    res.send("thank you for the feedback! ");
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