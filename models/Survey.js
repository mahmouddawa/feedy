const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  //userId: String,
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponse: Date,
});

mongoose.model("survey", surveySchema);

//every collection can save only 4 MB!
// for the subdoc collections like the Recipient every Recipient can save only 4 MB
// in case our survey was a subdoc collection as well, we might face some storage errros.
