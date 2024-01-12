import express from 'express'
import setupMiddleware from './middleware/middleware'
import setupRoutes from './routes'

const app = express()
setupMiddleware(app)
void setupRoutes(app)
export default app
