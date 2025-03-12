import mongoose from 'mongoose';
import { app } from './app';
import { handleExit } from './utils/handleExit';
import { config } from './config/index';

process.on('uncaughtException', (err : Error) => handleExit(err, 'Uncaught Exception'))

const DB = config.databaseUrl

mongoose
  .connect(DB)
  .then(() => console.log("MongoDB is ok!"))
  .catch((error) => console.log(error))

const port = config.port

const server = app.listen(port, () => {
  console.log(`App started with port - ${port}`)
})

process.on('unhandledRejection', (err: Error) => handleExit(err, 'Unhandled Rejection!', server))
