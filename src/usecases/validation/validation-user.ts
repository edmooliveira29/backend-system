import bcrypt from 'bcrypt'
export class ValidationUser {
  emailIsValid (email: string): boolean {
    // eslint-disable-next-line max-len, no-useless-escape, prefer-regex-literals
    const regexp = new RegExp(/^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
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
        message: 'A senha deve conter pelo menos 8 caracteres',
        isValid: false
      }
    } else if (!(/[0-9]/).test(password)) {
      return {
        message: 'A senha deve conter pelo menos 1 dígito',
        isValid: false
      }
    } else if (!(/[A-Z]/).test(password)) {
      return {
        message: 'A senha deve conter pelo menos uma letra maiúscula',
        isValid: false
      }
    } else if (!(/[a-z]/).test(password)) {
      return {
        message: 'A senha deve conter pelo menos uma letra minúscula',
        isValid: false
      }
    } else if (!(/[^a-zA-Z0-9]+/g).test(password)) {
      return {
        message: 'A senha deve conter pelo menos um caracter especial',
        isValid: false
      }
    } else {
      return {
        isValid: true
      }
    }
  }

  async comparePassword (passwordRequest: string, passwordRepository: string): Promise<object> {
    const result = await bcrypt.compare(passwordRequest, passwordRepository).then(function (result) {
      return result
    })
    if (result) {
      return { passwordValid: true }
    } else {
      return {
        data: {
          message: 'Senha inválida. Tente novamente',
          passwordValid: false
        }
      }
    }
  }

  async hashPassword (password: string): Promise<any> {
    return bcrypt.hash(password, 10).then(function (hash) { return hash })
  }
}
