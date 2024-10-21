import User from './user.types.js';
import Storage from './storage.js';

const storage = new Storage();

function getRecord(uuid: string): User | undefined {
  return storage.getRecord(uuid);
}

async function getAll(): Promise<User[]> {
  return await storage.getAll();
}

function createUser(userData: User): User {
  return storage.createRecord(userData);
}

function updateUser(userData: User): User | undefined {
  return storage.updateRecord(userData);
}

function deleteUser(id: string): boolean {
  return storage.deleteRecord(id);
}

export default { getAll, createUser, getRecord, updateUser, deleteUser };
