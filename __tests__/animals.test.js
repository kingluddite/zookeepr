const fs = require('fs');
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
  filtersByQuery,
} = require('../lib/animals');
const { animals } = require('../data/animals.json');

jest.mock('fs');

test('should create an animal object', () => {
  const animal = createNewAnimal({ name: 'Joe', id: 'asdfasdf' }, animals);

  expect(animal.name).toBe('Joe');
  expect(animal.id).toBe('asdfasdf');
});

test('should filter by query', () => {
  const startingAnimals = [
    {
      id: '3',
      name: 'Erica',
      species: 'gorilla',
      diet: 'omnivore',
      personalityTraits: ['quirky', 'rash'],
    },
    {
      id: '4',
      name: 'Noel',
      species: 'bear',
      diet: 'carnivore',
      personalityTraits: ['impish', 'sassy', 'brave'],
    },
  ];

  const updatedAnimals = filtersByQuery(
    { species: 'gorilla' },
    startingAnimals
  );

  expect(updatedAnimals.length).toEqual(1);
});

test('should find by id', () => {
  const startingAnimals = [
    {
      id: '3',
      name: 'Erica',
      species: 'gorilla',
      diet: 'omnivore',
      personalityTraits: ['quirky', 'rash'],
    },
    {
      id: '4',
      name: 'Noel',
      species: 'bear',
      diet: 'carnivore',
      personalityTraits: ['impish', 'sassy', 'brave'],
    },
  ];

  const result = findById('3', startingAnimals);

  expect(result.name).toBe('Erica');
});

test('should validate personality traits', () => {
  const animal = {
    id: '3',
    name: 'Erica',
    species: 'gorilla',
    diet: 'omnivore',
    personalityTraits: ['quirky', 'rash'],
  };

  const invalidAnimal = {
    id: '3',
    name: 'Erica',
    species: 'gorilla',
    diet: 'omnivore',
  };

  const result = validateAnimal(animal);
  const result2 = validateAnimal(invalidAnimal);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
