import express from 'express'
import setupMiddleware from './middleware/middleware'
import setupRoutes from './routes'

const app = express()
setupMiddleware(app)
setupRoutes(app)

export default app
