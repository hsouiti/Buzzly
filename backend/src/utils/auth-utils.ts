import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'
import { User } from '@sharedTypes/auth.d'
import { db } from '../config/db'

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}



export const comparePasswords = async(password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
}


export const generateToken = async(userId:string): Promise<string> => {
    return jwt.sign(
        {userId},
        config.jwt.secret as string, 
        {expiresIn: config.jwt.expiresIn || '1d'}
    )
}


export const generateVerificationToken = async (email: string): Promise<string> => {
    return jwt.sign(
        {email},
        config.jwt.secret as string, 
        {expiresIn: config.jwt.expiresIn || '1d'}
    )
}

export const checkIfUserExist = async(email: string): Promise<User | null> => {
    const user = await db.user.findUnique({where: {email}})
    return user || null
}