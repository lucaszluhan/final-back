import { User } from './classes';

let users: User[] = [];

let lucas: User = new User('lucas', '123');
lucas.notes = [{ noteNumb: 0, detail: 'lalala', description: 'lalalala' }];
users.push(lucas);

export default users;
