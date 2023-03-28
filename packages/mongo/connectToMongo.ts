import * as mongoDB from 'mongodb'
require("dotenv-mono").load()


export const collections: { user?: mongoDB.Collection} = {}

export async function connectToMongo() {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB!)
    await client.connect()
    const db: mongoDB.Db = await client.db(process.env.DATABASE)
    const userCollection: mongoDB.Collection = db.collection(process.env.COLLECTION)

    collections.user = userCollection
    console.log('Successfully connected to mongoDB!')
}
