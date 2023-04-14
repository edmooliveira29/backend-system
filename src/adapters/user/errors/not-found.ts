export class NotFound extends Error {
  constructor (paramName: string) {
    super('Not Found: ' + paramName + '.')
    this.name = 'NotFound'
  }
}
