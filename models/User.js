const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema }= mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
});


mongoose.model('users', userSchema);


// in testing environment your Model might be required multiple times and this will let Mongoose think
// that we are trying to require multiple models called 'users' => error 
// 