/* eslint-disable n/no-path-concat */
import { type Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()

  app.use('/v1/api', router)
  readdirSync(`${process.cwd()}/src/main/routes/`).map(async fileName => {
    if (!fileName.includes('.test.')) {
      (await import(`../routes/${fileName}/${fileName}-router`)).default(router)
    }
  })
}
