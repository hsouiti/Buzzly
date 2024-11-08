import express, { NextFunction,Request, response, Router} from 'express'
import { login, register  } from '../controllers/auth-controller'

const authRoutes:Router = express.Router();

authRoutes.post('/login', login);
 /*authRoutes.post('/register',  register);  */

 authRoutes.post('/register', async (req, res, next) => {
    try {
        await register(req, res, next);
    } catch (error) {
        next(error);
    }
}); 

export default authRoutes