/* eslint-disable n/no-path-concat */
import { type Express, Router, type Response } from 'express'
import { readdirSync } from 'fs'

export default async (app: Express): Promise<void> => {
  const router = Router()
  app.use('/v1', router)

  const importPromises = readdirSync(`${process.cwd()}/src/main/routes/`).map(async fileName => {
    if (!fileName.includes('.test.')) {
      const module = await import(`../routes/${fileName}/${fileName}-router`)
      return module.default(router)
    }
  })

  await Promise.all(importPromises)

  app.post('/test', (req, res) => {
    res.json(req.body)
  })

  app.use((req: any, res: Response) => {
    res.status(403).json({ error: 'Route not allowed' })
  })
}
