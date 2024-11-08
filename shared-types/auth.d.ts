import { Role } from "./enums";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string | null;
    role: Role;
    verificationToken?: string | null;
    verificationTokenExpires?: Date | null;  
    resetPasswordToken?: string | null;
    resetPasswordTokenExpires?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export type PublicUser = Omit<User, 'password' | 'createdAt' | 'updatedAt' | 'verificationTokenExpires'>;

export type UserUpdateInput = {
   id: string;
    name: string;
    email: string;
    password: string | null;
    role: Role;
    verificationToken?: string | null;
    verificationTokenExpires?: Date | null;  
    resetPasswordToken?: string | null;
    resetPasswordTokenExpires?: Date | null;
    createdAt: Date;
    updatedAt: Date;
};

export interface JwtPayload  {
    userId: string;
    role: Role;
}


export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: PublicUser;
    token?: string;
    message: string;
}


export interface AuthError {
    statusCode: number;
    message: string;
}