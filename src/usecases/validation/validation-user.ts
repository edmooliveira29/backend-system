export class ValidationUser {
  public email: string
  public name: string
  public password: string

  constructor (user: { name: string, email: string, password: string }) {
    this.email = user.email
    this.name = user.name
    this.password = user.password
  }

  emailIsValid (): boolean {
    // eslint-disable-next-line max-len, no-useless-escape, prefer-regex-literals
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if (regexp.test(this.email)) {
      return true
    } else {
      return false
    }
  }

  nameIsValid (): boolean {
    if (this.name.length <= 2 || this.name.length > 255) {
      return false
    } else {
      return true
    }
  }

  passwordIsValid (): object {
    if ((this.password.length < 8)) {
      return {
        message: 'Password must be at least 8 characters long',
        isValid: false
      }
    } else if (!(/[0-9]/).test(this.password)) {
      return {
        message: 'Password must be at least 1 digit',
        isValid: false
      }
    } else if (!(/[A-Z]/).test(this.password)) {
      return {
        message: 'Password must be at least 1 uppercase letter',
        isValid: false
      }
    } else if (!(/[a-z]/).test(this.password)) {
      return {
        message: 'Password must be at least 1 lowercase letter',
        isValid: false
      }
    } else if (!(/[^a-zA-Z0-9]+/g).test(this.password)) {
      return {
        message: 'Password must be at least 1 special characters',
        isValid: false
      }
    } else {
      return {
        isValid: true
      }
    }
  }
}
