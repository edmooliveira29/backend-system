import { MongoConnection } from '../infra/helpers/mongo-helper'

MongoConnection.connect('mongodb://localhost:27017')
  .then(async (): Promise<void> => {
    const app = (await import('./config/app')).default
    app.listen(5000, () => { console.log('Server running  at http://localhost:5000') })
  }).catch(error => { console.error(error) })
