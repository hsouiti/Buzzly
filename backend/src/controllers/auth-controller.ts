import {  NextFunction, Request,  Response } from "express"
import {AuthError, AuthResponse, RegisterRequest, User} from '@sharedTypes/auth.d'
import {db} from '../config/db'
import {Role} from '../../../shared-types/enums' 

import { generateToken, generateVerificationToken, hashPassword } from "../utils/auth-utils";
import { checkIsValidEmail, checkPassword } from "../utils/helpers";


export const register = async(
    req: Request<{}, {}, RegisterRequest>,
    res: Response<AuthResponse | AuthError>,
    next: NextFunction 
    
) =>{
    console.log('Received request with body:', req.body);
   
    const {name, email, password} = req.body
     const requiredFields = ['name', 'email', 'password']
     try {
               // Inputs Validation
        // empty fields      
        for (const field of requiredFields) {
            if(!(req.body as any)[field]){
                return res.
                        status(400)
                        .json(
                            {
                                statusCode: 400, 
                                message: `the  ${field} field is required`
                            }
                        )        
            }
        } 

       
      
    // valid email
    if(!checkIsValidEmail(email)){
        return res.status(400).json({
            statusCode: 400,
            message: 'Invalid email format'
        })
    }

    // valid password
    if(!checkPassword(password)){
        return res.status(400).json({
            statusCode: 400,
            message: 'Password does not meet requirements'
        })
    }
       

            
    // Check if the user already exist
    const existUser = await db.user.findUnique({where: {email}})
    if(existUser){
        return res.status(400).json({
            statusCode: 400, 
            message: 'User already exists'
        })
    }
 
    // Password Hashing:
    const hashedPassword = await hashPassword(password)
    
     // Generate Verification Token:
    const token = await generateVerificationToken(email)
    
    // If the user doesn't exist, store the user data in the database.
    const user = await db.user.create({ 
        data: {
            name,
            email,
            password: hashedPassword,
            role: Role.ADMIN,
            verificationToken: token
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    }) 

    // TODO: Send Verification Email:    

    return res.status(201).json({
        statusCode: 201,
        message: 'Registration successful. Please check your email to verify your account.',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
        
    } catch (error){
            console.error('Error during registration:', error);
        next(error)
    }
}





export const login = (req: Request, res: Response) =>{
    res.send('login!')
}
