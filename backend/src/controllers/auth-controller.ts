import { NextFunction, Request, Response } from "express"
import {AuthError, AuthResponse, RegisterRequest, User} from '@sharedTypes/auth.d'
import {Role} from '@sharedTypes/enums'
import {db} from '@/config/db'
import { generateToken } from "@/utils/auth-utils";


const error: AuthError = { statusCode: 400, message: 'User already exists' };


export const register = async(req: Request<{}, {}, RegisterRequest>, res: Response<AuthResponse | AuthError>, next: NextFunction) =>{
    const {name, email, password} = req.body
   try {
        
        // Check if the user already exist
        const existUser = await db.user.findUnique({where: {email}})
        if(existUser){
            return res.status(400).json(error)
        }

        // If the user doesn't exist, create one
        const user: User = await db.user.create({ 
            data: {name, email, password, role: Role.ADMIN }
        }) 

        // Create token
        const token = await generateToken(user.id)

        return res.status(200).json({user, token})
        
    } catch {}
}





export const login = (req: Request, res: Response) =>{
    res.send('login!')
}
