import dotenv from 'dotenv'

dotenv.config({ path: "./config.env" })

if(!process.env.DATABASE || !process.env.DATABASE_PASSWORD){
  throw new Error('DATABASE or DATABASE_PASSWORD is not defined')
}

export const config = {
  databaseUrl: process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD),
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV
};