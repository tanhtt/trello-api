/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// Init an object trelloDatabaseInstance null at the begin (not connect yet)
let trelloDatabaseInstance = null

// Init an object Client Instance to connect to db
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // https://www.mongodb.com/docs/drivers/node/current/fundamentals/stable-api/
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  // Call connect to DB Atlas with URI
  await mongoClientInstance.connect()

  // Connect success, then get Db by name, and assign to trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

// function GET_DB export Trell DB Instance after connected to Mongodb, so we can use in code
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to database first!')
  return trelloDatabaseInstance
}
