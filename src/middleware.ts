import { Request, Response, NextFunction } from 'express';
import users from './database';

let confirmarUsuario = (req: Request, res: Response, next: NextFunction) => {
   for (let user of users) {
      if (user.username == req.body.username) {
         res.status(400).send({ message: `Usuario ja existente!` });
      }
   }
   next();
};

export { confirmarUsuario };
