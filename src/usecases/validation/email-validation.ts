export class EmailValidation {
  public email: string
  constructor (email: string) {
    this.email = email
  }

  isValid (): boolean {
    // eslint-disable-next-line max-len, no-useless-escape, prefer-regex-literals
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return regexp.test(this.email)
  }
}
