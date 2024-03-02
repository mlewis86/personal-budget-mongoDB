//Budget API

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const budgetModel = require('./models/budget_schema');
const url = 'mongodb://localhost:27017/assignment08';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database'))
    budgetModel.find({})
    .then((data)=> {
        console.log(data)
    })
  .catch((connectionError)=> {
    console.log(connectionError)
  })

//endpoint to fetch data
app.get('/budget', async (req, res) => {
  try {
    const entries = await budgetModel.find(); 
    res.json(entries);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//endpoint to add data
app.post('/budget', async (req, res) => {
  const entry = new budgetModel({ 
    title: req.body.title,
    budget: req.body.budget,
    color: req.body.color
  });

  try {
    const newEntry = await entry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
