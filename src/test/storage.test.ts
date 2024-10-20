import User from '../user.types.js';
import Storage from '../storage.js';
import { validate as isUuidValid } from 'uuid';

const storage = new Storage();

describe('Append record', () => {
  test('should create record', () => {
    const userData: User = {
      username: 'Elena',
      age: 25,
      hobbies: ['ski', 'bike', 'movies'],
    };
    // const recordCount = storage.getAll().length;
    const user = storage.create(userData);

    expect(isUuidValid(user.id || '')).toBe(true);
  });
});
