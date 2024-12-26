import env from 'dotenv'
import { Db, MongoClient, ServerApiVersion } from 'mongodb'

env.config()

class MongoClientHandler {
  db: Db | undefined
  client: MongoClient | undefined

  init = async (dbName: string) => {
    this.client = new MongoClient(process.env.MONGO_URI as string, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })
    try {
      await this.client.connect()
      this.db = await this.client.db(dbName)
    } catch (e) {
      console.error(e)
      this.client.close()
    }
  }
  getCollection = async (dbName: string, collectionName: string) => {
    if (this.db === undefined) {
      throw new Error('db undefined')
    }
    return this.db.collection(collectionName)
  }
  close = async () => {
    await this.client?.close()
  }
}

const mongoClient = new MongoClientHandler()
mongoClient.init(process.env.DB_NAME as string)
export { mongoClient }
