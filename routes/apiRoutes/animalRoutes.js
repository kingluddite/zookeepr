const router = require('express').Router();
const { animals } = require('../../data/animals');
const {
  findById,
  validateAnimal,
  createNewAnimal,
  filtersByQuery,
} = require('../../lib/animals');

router.get('/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filtersByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

router.post('/animals', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  // if any data in req.body is missing, send 400 error back
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted');
  } else {
    // add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    res.json(animals);
  }
});

module.exports = router;
