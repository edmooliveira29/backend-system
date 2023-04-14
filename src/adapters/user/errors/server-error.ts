export class ServerError extends Error {
  constructor (message: string) {
    super('Server error: ' + message + '.')
    this.name = 'Server error'
  }
}
