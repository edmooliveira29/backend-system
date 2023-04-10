export class ValidationUser {
  public email: string
  public name: string

  constructor(user: { name: string, email: string }) {
    this.email = user.email
    this.name = user.name
  }

  emailIsValid(): boolean {
    // eslint-disable-next-line max-len, no-useless-escape, prefer-regex-literals
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if (regexp.test(this.email)) {
      return true
    } else {
      return false
    }
  }

  nameIsValid(): boolean {
    if (this.name.trim().length < 2 || this.name.trim().length > 255) {
      return false
    } else {
      return true
    }
  }
}
