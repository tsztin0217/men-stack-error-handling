// controllers/fruits.js
const express = require('express');
const router = express.Router();

const Fruit = require('../models/fruit.js');

router.get('/new', (req, res) => {
  res.render('fruits/new.ejs');
});



// controllers/fruits.js
router.post("/", async (req, res) => {
  try {
    if (!req.body.name.trim()) {
      throw new Error("Invalid input: The name field cannot be empty!");
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
  } catch (err) {
    res.render("error.ejs", { msg: err.message });
  }
});

// controllers/fruits.js
router.post("/", async (req, res) => {
    try {
      await Fruit.create(req.body);
      req.session.message = "Fruit successfully created.";
      res.redirect("/fruits");
    } catch (err) {
      req.session.message = err.message;
      res.redirect("/fruits");
    }
  });
  


  

  
router.get('/', async (req, res) => {
  const foundFruits = await Fruit.find();
  res.render('fruits/index.ejs', { fruits: foundFruits });
});

module.exports = router;
