export class NotFound extends Error {
  constructor (paramName: string) {
    super('Erro: ' + paramName + '.')
    this.name = 'NotFound'
  }
}
