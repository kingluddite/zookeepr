const router = require('express').Router();
const { zookeepers } = require('../../data/zookeepers.json');
const {
  findById,
  validateZookeeper,
  createNewZookeeper,
  filterByQuery,
} = require('../../lib/zookeepers');

router.get('/zookeepers', (req, res) => {
  let results = zookeepers;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
  const result = findById(req.params.id, zookeepers);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

router.post('/zookeepers', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = zookeepers.length.toString();

  // if any data in req.body is missing, send 400 error back
  if (!validateZookeeper(req.body)) {
    res.status(400).send('The zookeeper is not properly formatted');
  } else {
    // add zookeeper to json file and zookeeper animals array in this function
    const zookeeper = createNewZookeeper(req.body, zookeepers);
    res.json(zookeepers);
  }
});

module.exports = router;
