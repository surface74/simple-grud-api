import User from './user-types.js';
import Storage from './storage.js';

const storage = new Storage();

function getRecord(uuid: string): User | undefined {
  return storage.getRecord(uuid);
}

function getAll(): User[] {
  return storage.getAll();
}

function createUser(userData: User): User {
  return storage.create(userData);
}

function updateUser(userData: User): User | undefined {
  return storage.updateRecord(userData);
}

function deleteUser(id: string): boolean {
  return storage.deleteRecord(id);
}

export default { getAll, createUser, getRecord, updateUser, deleteUser };
