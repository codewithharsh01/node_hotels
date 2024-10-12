const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Person = require('./modules/Person');
 
app.get('/', function (req, res) {
  res.send('Welcome to my hotel... How i can help you?')
})

//POST route to add a person
app.post('/person', async (req, res) =>{
  try{
    const data = req.body //asuming thevrequest body contains the person data

    //create a new person dcument using the mongoose model
    const newPerson = new Person(data);

    //Save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response); 

  }catch(err){
    console.log(err);
    res.status(500).json({error: "Internet Server Error"});

  }




})

app.listen(3000,()=>{
    console.log('Listening on port 3000');
})
