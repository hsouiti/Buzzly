import { Role } from "./enums";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}


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
    user: User;
    token: string;
}


export interface AuthError {
    statusCode: number;
    message: string;
}