/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { MongoConnection } from '../infra/helpers/mongo-helper'
import dotenv from 'dotenv'

dotenv.config()

MongoConnection.connect(process.env.MONGO_URL as string)
  .then(async (): Promise<void> => {
    const app = (await import('./config/app')).default
    app.listen(5000, () => { console.log(`Server running  at http://localhost:${process.env.API_PORT as string}`) })
  }).catch(error => { console.error(error) })
