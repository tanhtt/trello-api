/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  // Enable req.body json data
  app.use(express.json())

  // Use api v1
  app.use('/v1', APIs_V1)

  // Define error-handling middleware
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hi ${env.AUTHOR} Backend Server is running successfully at host http://${ env.APP_HOST }:${ env.APP_PORT }`)
  })

  // Clean up server after shut down
  // https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
  exitHook(() => {
    console.log('4. Server is shuting down')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB')
  })

}

// Only connected Mongodb then start server backend
// Immediately-invoked / Anonymous Async Functions (IIFE)
(async () => {
  try {
    console.log('1. Connecting to Mongdb ...')
    await CONNECT_DB()
    console.log('2. Connectd to Mongodb')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// console.log('1. Connecting to Mongdb ...')
// CONNECT_DB()
//   .then(() => console.log('2. Connectd to Mongodb'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
