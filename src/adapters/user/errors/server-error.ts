export class ServerError extends Error {
  constructor (message: string) {
    super('Erro do servidor: ' + message + '.')
    this.name = 'Server error'
  }
}
