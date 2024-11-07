import exp from 'constants'
import dotenv from 'dotenv'

dotenv.config()

if(!process.env.JWT_SECRET){
    throw new Error('Missing JWT_SECRET in environment variables')
}

export const config =  {
    port: process.env.PORT || 5000,
    databaseURL: process.env.DATABASE_URL as string,
    jwt : {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    },
    nodeEnv: process.env.NODE_ENV || 'development'
}