import { ServerError } from '../user/errors/server-error'
import { type UserHttpResponse } from '../user/ports/user-http-response'

export const badRequest = (error: Error): UserHttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const ok = (data: any): UserHttpResponse => ({
  statusCode: 200,
  body: data
})

export const serverError = (reason: string): UserHttpResponse => ({
  statusCode: 500,
  body: new ServerError(reason)
})
