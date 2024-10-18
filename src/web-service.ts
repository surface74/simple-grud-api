import User from './user-types.js';
import Storage from './storage.js';

const storage = new Storage();

export function getAll(): User[] {
  return storage.getAll();
}
