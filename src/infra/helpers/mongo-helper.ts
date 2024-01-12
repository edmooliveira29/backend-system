import { MongoClient, type Collection } from 'mongodb'

export const MongoConnection = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    console.log('===================================')
    console.log('===================================')
    console.log('===================================')
    console.log('===================================')
    console.log(uri)
    this.client = await MongoClient.connect(uri)
    const username = process.env.MONGO_URL_USERNAME
    const password = process.env.MONGO_URL_PASSWORD
    let options: any = {}
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'deployment') {
      options = {
        auth: {
          username,
          password
        }
      }
    }
    try {
      const adminDb = this.client.db('system-database')
      const users = await adminDb.command({ usersInfo: username })
      if (users.users.length === 0) {
        await adminDb.command({
          createUser: 'system-user-database',
          pwd: password,
          roles: [{ role: 'dbOwner', db: 'system-database' }]
        })
      }
      await this.disconnect()
      this.client = await MongoClient.connect(uri, options)
    } catch (err) {
      console.error('Erro ao criar usuário no MongoDB:', err)
      throw err
    }
  },
  async disconnect (): Promise<void> {
    if (this.client) {
      await this.client.close()
    }
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  async clearCollection (name: string): Promise<void> {
    await this.client.db().collection(name).deleteMany({})
  }
}
