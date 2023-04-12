import { type UserHttpResponse } from '../user/ports/user-http-response'

export const badRequest = (error: Error): UserHttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const ok = (data: any): UserHttpResponse => ({
  statusCode: 200,
  body: data
})

export const internalError = (error: Error): UserHttpResponse => ({
  statusCode: 500,
  body: error.message
})
