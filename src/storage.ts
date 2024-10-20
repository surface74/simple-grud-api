import { ServerError } from './error.js';
import User from './user-types.js';
import { v4 as getUUID } from 'uuid';

export default class Storage {
  private records: User[];

  public constructor() {
    this.records = new Array<User>();
  }

  public create(newUser: User): User {
    try {
      const user: User = { ...newUser, id: getUUID() };
      this.records.push(user);
      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      throw new ServerError(message);
    }
  }

  public getAll(): User[] {
    return [...this.records];
  }

  public getRecord(uuid: string): User | undefined {
    return this.records.find((user) => user.id === uuid);
  }

  public updateRecord(userData: User): User | undefined {
    const user = this.records.find((user: User): boolean => user.id === userData.id);
    if (!user) return;
    user.username = userData.username;
    user.age = userData.age;
    user.hobbies = userData.hobbies;
    return user;
  }

  public deleteRecord(uuid: string): boolean {
    const index = this.records.findIndex((user: User): boolean => user.id === uuid);
    if (index === -1) {
      return false;
    }
    this.records.splice(index, 1);
    return true;
  }
}
