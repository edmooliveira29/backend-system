import { MongoConnection } from '../infra/helpers/mongo-helper'
import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production'
})
MongoConnection.connect(process.env.MONGO_URL as string)
  .then(async (): Promise<void> => {
    const app = (await import('./config/app')).default
    app.listen(5000, () => { console.log(`Server running  at http://localhost:${process.env.API_PORT as string}`) })
  }).catch(error => { console.error(error) })
