import User from './user-types.js';
import { v4 as getUUID } from 'uuid';

export default class Storage {
  private records: User[];

  public constructor() {
    this.records = new Array<User>();
  }

  public add(newUser: User): void {
    const user: User = { ...newUser, id: getUUID() };
    console.log(`adding user id=${user.id}`);
  }

  public getAll(): User[] {
    return [...this.records];
  }
}
