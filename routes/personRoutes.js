const express  = require('express');
const router  = express.Router();

 const Person = require('./../models/person');

// POST route to add a person

router.post('/', async (req, res) =>{
  try{
    const data = req.body

// Create a new person document using the mongoose model
 const newPerson = new Person(data);

// save the new person to the database
const response = await newPerson.save()
  console.log('data saved');
  res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});

  }
})

// GET method to get the person
router.get('/',async (req, res) =>{
  try{
    const data = await Person.find();
    console.log('data fetched');
  res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

// person worktype
router.get('/:workType', async (req, res) => {
  try{
    const workType = req.params.workType;
  if(workType == 'waiter' || workType == 'manager' || workType == 'chef'){
    const response = await Person.find({work: workType});
    console.log('response fetched');
    res.status(200).json(response);
    
  }else{
    res.status(404).json({error: 'Invalid work Type'});
  }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

//  Update Method for person

router.put('/:id',async (req, res) => {
  try{
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId,updatedPersonData, {
      new: true,
      runValidators: true,
    })

    if (!response) {
      return res.status(404).json({error: 'person not found'});
    }
    console.log('data updated');
    res.status(200).json(response);
    
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});

  }
})
// Delete method for person


router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Person deleted');
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;