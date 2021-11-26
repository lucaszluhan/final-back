import { randomUUID } from 'crypto';

class User {
   id: string;
   notes: Note[];
   noteNumb: number;
   constructor(public username: string, public password: string) {
      this.username = username;
      this.password = password;
      this.notes = [];
      this.id = randomUUID();
      this.noteNumb = 1;
   }
}

class Note {
   constructor(public noteNumb: number, public description: string, public detail: string) {
      this.noteNumb = noteNumb;
      this.description = description;
      this.detail = detail;
   }
}

export { User, Note };
