import { type ICompanyCreateUseCase } from './port/company-port'
import { type CompanyEntity } from '../../entities/company/company-entity'
import { ValidationUser } from '../validation/validation-user'
import { type ICompanyDataAccess } from './port/company-data-access'
import { type IUserCreateUseCase } from '../user/port/user-port'

export class CompanyUseCase implements ICompanyDataAccess {
  public companyUseCase: ICompanyCreateUseCase
  public userUseCase: IUserCreateUseCase
  public validation: ValidationUser

  constructor (companyUseCase: ICompanyCreateUseCase, userUseCase: IUserCreateUseCase) {
    this.companyUseCase = companyUseCase
    this.userUseCase = userUseCase
    this.validation = new ValidationUser()
  }

  async createCompany (company: CompanyEntity): Promise<any> {
    const validationPassword: any = this.validation.passwordIsValid(company.password)
    company = {
      ...company,
      password: await this.validation.hashPassword(company.password)
    }

    if (!validationPassword.passwordIsValid) {
      return { message: validationPassword.message }
    } else if (!this.validation.emailIsValid(company.email)) {
      return { message: 'E-mail não é válido' }
    } else if (!this.validation.nameIsValid(company.name)) {
      return { message: 'Nome não é válido' }
    } else {
      await this.companyUseCase.createCompany(company)
      const userResponse = await this.userUseCase.createUser(company)
      console.log(userResponse)
      return {
        message: 'Empresa criada com sucesso'
        // data: {
        //   _id: userResponse.data._id,
        //   name: userResponse.data.name,
        //   email: userResponse.data.email,
        //   createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        //   profilePicture: userResponse.data.profilePicture,
        //   createWithGoogle: userResponse.data.createWithGoogle
        // }
      }
    }
  }
}
