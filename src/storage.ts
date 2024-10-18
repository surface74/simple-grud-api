import User from './user-types.js';

export default class Storage {
  static instance: Storage = new Storage();

  static Records = new Array<User>();

  private constructor() {
    if (!Storage.instance) Storage.instance = this;
  }

  public static getInstance(): Observer {
    return Storage.instance;
  }
}
