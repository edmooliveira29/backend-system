import { MongoClient } from 'mongodb'

export class MongoHelper {
  public client: MongoClient = new MongoClient('mongodb://localhost:27017')

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  }

  async disconnect (): Promise<void> {
    await this.client.close()
  }

  async getCollection (name: string): Promise<any> {
    return this.client.db().collection(name)
  }
}
