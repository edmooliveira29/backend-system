export class UserEntity {
    public readonly name: string
    public readonly password: string
    constructor(name: string, password: string) {
        this.name = name
        this.password = password
        Object.freeze(true)
    }
}

