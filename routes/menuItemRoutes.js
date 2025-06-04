const express  = require('express');
const router  = express.Router();
const MenuItem = require('./../models/MenuItem');


// POST route to add a MenuItem

router.post('/', async (req, res) =>{
  try{
    // console.log("Incoming request body:",req.body);


    const data = req.body

// Create a new MenuItem document using the mongoose model
 const newMenuItem = new MenuItem(data);

// save the new MenuItem to the database
const response = await newMenuItem.save();
  console.log('data saved');
  res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});

  }
})

// GET method to get the MenuItem
router.get('/',async (req, res) =>{
  try{
    const data = await MenuItem.find();
    console.log('data fetched');
  res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})


// MenuItem taste worktype
router.get('/:tasteType', async (req, res) => {
  try {
    const tasteType = req.params.tasteType;

    if (tasteType === 'spicy' || tasteType === 'sweet' || tasteType === 'sour') {
      const response = await MenuItem.find({ taste: tasteType });
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid taste type' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// giving command
module.exports = router;