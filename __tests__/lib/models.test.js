'use strict';

const connect = require('../../utils/mongoose.connect');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

const Categories = require('../../src/models/categories');
const repository = new Categories();

describe('The Category Repository', () => {
  beforeAll(() => {
    return connect(MONGODB_URI);
  });

  // afterAll(() => {
  //   db.categories.drop();
  // })

  it('should post a new category to the db and retreive it', async () => {
    const result = await repository.post({
      name: 'Category 1',
      displayName: 'CATEGORY 1',
      description: 'This is the first category in my db',
    });
    expect(result).toBeDefined();
    expect(result.name).toBe('Category 1');
    expect(result.description).toBe('This is the first category in my db');
    expect(result._id).toBeDefined();

    const fromDb = await repository.get(result._id);
    expect(fromDb).toBeDefined();
    expect(fromDb._id.toString()).toBe(result._id.toString());
    expect(fromDb.name).toBe('Category 1');
  });

  it('should return null if the id is invalid', async () => {
    const result = await repository.get('this is invalid');

    expect(result).toBeNull();
  });

  it('throws a validation error if any data is missing from category', () => {
    return expect(
      repository.post({
        displayName: 'Category 2',
        description: 'This should not be valid because I didnt provide a name',
      })
    ).rejects.toThrowError();
  });

  // create a put test

  // create a delete test
  it('should delete a specific category', async () => {
    const result = await repository.post({
      name: 'Category 1',
      displayName: 'CATEGORY 1',
      description: 'This is the first category in my db',
    });
    console.log(result);
    console.log(result._id);
    const deleteCat = await repository.delete(result._id);
    expect(deleteCat).toBeDefined();
  });
});
