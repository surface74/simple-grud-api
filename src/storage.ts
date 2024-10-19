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
}
