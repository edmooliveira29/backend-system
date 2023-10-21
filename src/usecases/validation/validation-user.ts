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
    if (!name) {
      return false
    }
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
        passwordIsValid: false
      }
    } else if (!(/[0-9]/).test(password)) {
      return {
        message: 'A senha deve conter pelo menos 1 dígito',
        passwordIsValid: false
      }
    } else if (!(/[A-Z]/).test(password)) {
      return {
        message: 'A senha deve conter pelo menos uma letra maiúscula',
        passwordIsValid: false
      }
    } else if (!(/[a-z]/).test(password)) {
      return {
        message: 'A senha deve conter pelo menos uma letra minúscula',
        passwordIsValid: false
      }
    } else if (!(/[^a-zA-Z0-9]+/g).test(password)) {
      return {
        message: 'A senha deve conter pelo menos um caracter especial',
        passwordIsValid: false
      }
    } else {
      return {
        passwordIsValid: true
      }
    }
  }

  async comparePassword (passwordRequest: string, passwordRepository: string): Promise<object> {
    const result = await bcrypt.compare(passwordRequest, passwordRepository).then(function (result) {
      return result
    })
    if (result) {
      return { passwordIsValid: true }
    } else {
      return {
        message: 'Senha inválida. Tente novamente',
        passwordIsValid: false
      }
    }
  }

  async hashPassword (password: string): Promise<any> {
    return await bcrypt.hash(password, 10).then(function (hash) { return hash })
  }
}
