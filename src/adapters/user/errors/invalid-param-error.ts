export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super('Parâmentro invalido: ' + paramName + '.')
    this.name = 'InvalidParamError'
  }
}
