import {  NextFunction, Request,  Response } from "express"
import {AuthError, AuthResponse, LoginRequest, RegisterRequest, User} from '@sharedTypes/auth.d'
import {db} from '../config/db'
import {Role} from '../../../shared-types/enums' 

import { checkIfUserExist, comparePasswords, generateToken, generateVerificationToken, hashPassword } from "../utils/auth-utils";
import { checkIsValidEmail, checkPassword, getUserByEmail } from "../utils/helpers";
import { createError } from "../middleware/errors-handler";


export const register = async(
    req: Request<{}, {}, RegisterRequest>,
    res: Response<AuthResponse | AuthError>,
    next: NextFunction 
    
) =>{
   
    const {name, email, password} = req.body
     const requiredFields = ['name', 'email', 'password']
     try {

    // Inputs Validation
        // empty fields      
        for (const field of requiredFields) {
            if(!(req.body as any)[field]){
                throw createError(`the  ${field} field is required`, 400)
                    
            }
        } 
       
      
    // valid email
    if(!checkIsValidEmail(email)) throw createError ('Invalid email format', 400)
   
    // valid password
    if(!checkPassword(password)) throw createError(`Password does not meet requirements`, 400)
       
      
               
    // Check if the user already exist
    const existUser = await db.user.findUnique({where: {email}})
    if(existUser)  throw createError('User already exists', 400);
        
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
        next(error)
    }
}





export const login = async(
    req: Request<{}, {}, LoginRequest>,
     res: Response<AuthResponse | AuthError>,
      next: NextFunction) =>{
    const {email,password} = req.body
    try {

        // inputs Validation
        if(!email) throw createError('Email is required', 400)
        if(!password) throw createError('Password is required', 400)

        if(!checkIsValidEmail(email)) throw createError ('Invalid email format', 400)

        // Check if the user exist
        const user = await getUserByEmail(email)
        if(!user)  {
            throw createError('User does not exist', 400);
        }
        if(user && user.password) {

            // Check if the credentials are correct
            const isPasswordCorrect = await comparePasswords(password, user.password)
            if(!isPasswordCorrect) throw createError('Invalid credentials', 400)
             const token  = await generateToken(user.id)
            
             const sanitizedUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            };

            return res.status(200).json({
                statusCode: 200,
                message: 'Login successful',
                token,
                user:sanitizedUser
            })


    }
        // TODO:Check if the user is verified
        


    } catch (error) {
        next(error)
    }
}
