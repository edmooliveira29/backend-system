import { MongoClient, type Collection } from 'mongodb'

export const MongoConnection = {
  client: null as unknown as MongoClient,
  db: null as unknown as any,

  async connect (uri: string): Promise<void> {
    const username = process.env.MONGO_URL_USERNAME
    const password = process.env.MONGO_URL_PASSWORD
    const options: any = {
      auth: {
        username,
        password
      },
      authMechanism: 'SCRAM-SHA-256'
    }
    console.log(options)
    this.client = await new MongoClient(uri, options).connect()
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  async clearCollection (name: string): Promise<void> {
    await this.client.db().collection(name).deleteMany({})
  }
}
