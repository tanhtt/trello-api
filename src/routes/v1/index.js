/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

// Router
// https://expressjs.com/en/guide/routing.html

import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from './boardRoutes'

const Router = express.Router()

// Check API v1 status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API V1 are ready to use' })
})

// Board APIs
Router.use('/boards', boardRoutes)

export const APIs_V1 = Router