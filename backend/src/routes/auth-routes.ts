import express, {Router} from 'express'
import { login, register } from '../controllers/auth-controller'

const authRoutes:Router = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/register', register);

export default authRoutes