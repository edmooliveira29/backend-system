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
  body: { message: error.message }
})

export const noContent = (error: Error): UserHttpResponse => ({
  statusCode: 404,
  body: { message: error.message }
})
