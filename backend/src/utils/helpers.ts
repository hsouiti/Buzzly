import { User } from "@sharedTypes/prisma"
import { db } from "@/config/db"


export const checkIsValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}



/*
    Contains at least one lowercase letter
    Contains at least one uppercase letter
    Contains at least one digit
    Contains at least one special character
    Is at least 8 characters long
    Only contains letters (both uppercase and lowercase), digits,
    and special characters ([@$!%*?&])
*/
export  const checkPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
}


export const getUserByEmail = async (email: string): Promise<User | null> => {
    return await db.user.findUnique({where: {email}})
}