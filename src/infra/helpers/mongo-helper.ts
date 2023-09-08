import { MongoClient, type Collection } from 'mongodb'

export const MongoConnection = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
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
    this.client = await MongoClient.connect(uri, options)
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
