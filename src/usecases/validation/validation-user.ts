import { type UserData } from '../../entities/user/user-entity'

export class ValidationUser {
  user: UserData

  constructor(user: UserData) {
    this.user = user
  }

  emailIsValid(): boolean {
    // eslint-disable-next-line max-len, no-useless-escape, prefer-regex-literals
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    if (regexp.test(this.user.email)) {
      return true
    } else {
      return false
    }
  }

  nameIsValid(): boolean {
    if (this.user.name.trim().length < 2 || this.user.name.trim().length > 255) {
      return false
    } else {
      return true
    }
  }
}
