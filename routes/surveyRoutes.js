const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");


const Survey = mongoose.model('surveys')

module.exports = (app) => {
  app.post("/api/surveys",  requireLogin,requireCredits, async (req, res) => {
    const { title, subject, body, recipients } =req.body;
    
    const survey = await new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(',').map(email=>({email: email.trim()})), // why the return value was ({}) read down
      _user: req.user.id,
      dateSent: Date.now(),

    });

    

  });
};






// i can require Survey directly, but still i might get some errors "related to mongoose" if i added test 
// to this file => retest this issue later


// i used the ({}) to tell the interpreter that i want to return an object like {email:email}
// otherwise it will get confused if i wrote onley {email} it will think inside of the {} is a function call