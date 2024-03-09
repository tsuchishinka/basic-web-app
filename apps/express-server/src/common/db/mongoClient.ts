import env from 'dotenv'
import { MongoClient, ServerApiVersion } from 'mongodb'

env.config()

class MongoClientHandler {
  client: MongoClient = new MongoClient(process.env.MONGO_URI as string, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })
  getCollection = async (dbName: string, collectionName: string) => {
    try {
      await this.client?.connect()
      const db = await this.client.db(dbName)
      return db.collection(collectionName)
    } catch (e) {
      await this.client.close()
      throw e
    }
  }
  close = async () => {
    await this.client?.close()
  }
}

export const mongoClient = new MongoClientHandler()
