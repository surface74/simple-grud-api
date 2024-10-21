import dotenv from 'dotenv';
import { startServer, closeServer } from '../app.js';
import { AddUser, CheckResponse, DeleteUser, GetAll } from './test-lib.js';
import User from '../types/user.types.js';

dotenv.config();
const port = Number.parseInt(process.env.PORT || '8080');

startServer(port);

afterAll((): void => closeServer());

describe('Server API', () => {
  test('check response', async () => {
    await expect(CheckResponse(port)).resolves.toBe('200');
    const data = await GetAll(port);
    const json: Array<User> = JSON.parse(data) as Array<User>;
    expect(json).toHaveLength(0);
  });

  test('check POST', async () => {
    await expect(AddUser(port)).resolves.toBe('201');
  });

  test('check GET ALL', async () => {
    await expect(AddUser(port)).resolves.toBe('201');
    const data = await GetAll(port);
    const json: Array<User> = JSON.parse(data) as Array<User>;
    expect(json).toHaveLength(2);
    expect(json[0]).toHaveProperty('id');
    expect(json[0]).toHaveProperty('username');
    expect(json[0]).toHaveProperty('age');
  });

  test('check DELETE', async () => {
    const data = await GetAll(port);
    const json: Array<User> = JSON.parse(data) as Array<User>;
    const userCounter = json.length;
    const { id } = json[0];

    await DeleteUser(port, id);
    const data2 = await GetAll(port);
    const json2: Array<User> = JSON.parse(data2) as Array<User>;
    expect(json2).toHaveLength(userCounter - 1);
  });
});
