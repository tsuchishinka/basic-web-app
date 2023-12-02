import env from 'dotenv'
import { MongoClient, ServerApiVersion } from 'mongodb'

env.config()

export const client = new MongoClient(process.env.MONGO_URI as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export const getCollection = async <T extends Document>() => {
  try {
    await client.connect()
    const db = await client.db(process.env.DB_NAME)
    return db.collection<T>(process.env.COLLECTION_NAME as string)
  } catch (e) {
    console.log(e)
    await client.close()
  }
}

export const closeDB = async () => {
  await client.close()
}
