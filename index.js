const express = require('express');

const app = express();

app.get('/', (req, res)=>{
  res.send({ Initial : 'Initial commit!'});
})

const PORT = process.env.PORT || 5000;
app.listen(PORT)






//Heroku inject the port in the env.port

//even though it looks like express is listening to the traffic but in reality Node is the 
//one is listening and routing it to express.. 
// app.listen(5000, ()=>{
//   console.log('listening on port 5000')
// });