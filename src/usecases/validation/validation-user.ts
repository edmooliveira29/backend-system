export class ValidationUser {
  emailIsValid (email: string): boolean {
    // eslint-disable-next-line max-len, no-useless-escape, prefer-regex-literals
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if (regexp.test(email)) {
      return true
    } else {
      return false
    }
  }

  nameIsValid (name: string): boolean {
    if (name.length <= 2 || name.length > 255) {
      return false
    } else {
      return true
    }
  }

  passwordIsValid (password: string): object {
    if ((password.length < 8)) {
      return {
        message: 'Password must be at least 8 characters long',
        isValid: false
      }
    } else if (!(/[0-9]/).test(password)) {
      return {
        message: 'Password must be at least 1 digit',
        isValid: false
      }
    } else if (!(/[A-Z]/).test(password)) {
      return {
        message: 'Password must be at least 1 uppercase letter',
        isValid: false
      }
    } else if (!(/[a-z]/).test(password)) {
      return {
        message: 'Password must be at least 1 lowercase letter',
        isValid: false
      }
    } else if (!(/[^a-zA-Z0-9]+/g).test(password)) {
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

  comparePassword (passwordRequest: string, passwordRepository: string): object {
    if (passwordRequest === passwordRepository) {
      return { passwordValid: true }
    } else {
      return {
        data: {
          message: 'Password is invalid. Please try again',
          passwordValid: false
        }
      }
    }
  }
}
