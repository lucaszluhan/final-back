import { Request, Response, Router } from 'express';
import { Note, User } from './classes';
import users from './database';
import { confirmarUsuario } from './middleware';

const routes = Router();

routes.post('/createAcc', confirmarUsuario, (req: Request, res: Response) => {
   let { username, password } = req.body;
   let newUser = new User(username as string, password as string);
   users.push(newUser);
   return res.status(200).send({ message: `usuario criado`, user: users });
});

routes.post('/login', (req: Request, res: Response) => {
   let { username, password } = req.body;
   let logUser = users.findIndex((user) => user.password == password && user.username == username);
   if (logUser < 0) {
      return res.status(404).send({ message: `usuario/senha nao conferem` });
   } else {
      return res.status(200).send({ message: `logado com sucesso`, user: users[logUser] });
   }
});

routes.get('/login/:id', (req: Request, res: Response) => {
   let id = req.params.id;
   let user = users.filter((user) => user.id == (id as string))[0];

   res.status(200).send({
      user: {
         notes: user.notes,
         name: user.username,
      },
      message: `usuario logado`,
   });
});

routes.post('/newNote/:id', (req: Request, res: Response) => {
   let id = req.params.id;
   let { detail, description } = req.body;
   let userIndex = users.findIndex((user) => user.id == id);
   let newNote: Note = new Note(users[userIndex].noteNumb, description, detail);
   users[userIndex].notes.push(newNote);
   users[userIndex].noteNumb++;
   res.send({ message: 'recado salvo' });
});

routes.put('/editNote/:id/:noteNumb', (req: Request, res: Response) => {
   let { id, noteNumb } = req.params;
   let { detail, description } = req.body;
   let userIndex = users.findIndex((user) => user.id == id);
   let noteIndex = users[userIndex].notes.findIndex((note) => note.noteNumb == Number(noteNumb));
   users[userIndex].notes[noteIndex].detail = detail;
   users[userIndex].notes[noteIndex].description = description;
   res.send({ message: 'nota alterada' });
});

routes.delete('/deleteNote/:id/:noteNumb', (req: Request, res: Response) => {
   let { id, noteNumb } = req.params;
   let userIndex = users.findIndex((user) => user.id == id);
   let noteIndex = users[userIndex].notes.findIndex((note) => note.noteNumb == Number(noteNumb));
   users[userIndex].notes.splice(noteIndex, 1);
   res.send({ message: 'nota deletada' });
});

export default routes;
