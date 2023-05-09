import { MongoClient, type Collection } from 'mongodb'

export const MongoConnection = {
  client: null as unknown as MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, { sslValidate: false, ssl: false })
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
