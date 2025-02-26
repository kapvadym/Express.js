import express from 'express';
import { twitRouter } from './src/twit/twit.controller.js';

const app = express()

async function main() {
  app.use(express.json())

  app.use('/api/twits', twitRouter);

  app.all('*', (req, res) => {
    res.status(404).json({
      message: "GlobalError -> Not Found"
    })
  })

  app.listen(4200, () => {
    console.log('Server is running on port 4200')
  })
}

main()