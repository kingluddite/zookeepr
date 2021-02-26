const path = require('path');
const router = require('express').Router();

router.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/animals', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

module.exports = router;
