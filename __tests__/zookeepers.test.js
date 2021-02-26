const fs = require('fs');
const zookeepers = require('../lib/zookeepers');
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require('../lib/zookeepers');

jest.mock('fs');

test('should create a zookeeper object', () => {
  const zookeeper = createNewZookeeper(
    {
      name: 'Danny',
      id: '123hollywood',
    },
    []
  );

  expect(zookeeper.name).toBe('Danny');
  expect(zookeeper.id).toBe('123hollywood');
});

test('should filter by query', () => {
  const startingZookeepers = [
    {
      id: '2',
      name: 'Manny',
      age: 31,
      favoriteAnimal: 'dolphin',
    },
    {
      id: '3',
      name: 'Maria',
      age: 99,
      favoriteAnimal: 'dog',
    },
  ];

  const updatedZookeepers = filterByQuery({ age: 31 }, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
  const startingZookeepers = [
    {
      id: '2',
      name: 'Manny',
      age: 31,
      favoriteAnimal: 'dolphin',
    },
    {
      id: '3',
      name: 'Maria',
      age: 99,
      favoriteAnimal: 'dog',
    },
  ];

  const result = findById('3', startingZookeepers);

  expect(result.name).toBe('Maria');
});

test('should validate age', () => {
  const zookeeper = {
    id: '2',
    name: 'Manny',
    age: 31,
    favoriteAnimal: 'dolphin',
  };

  const invalidZookeeper = {
    id: '3',
    name: 'Maria',
    age: '67',
    favoriteAnimal: 'dog',
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
