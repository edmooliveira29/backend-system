import { type ICompanyCreateUseCase } from './port/company-port'
import { type CompanyEntity } from '../../entities/company/company-entity'
import { ValidationUser } from '../validation/validation-user'
import { type ICompanyDataAccess } from './port/company-data-access'
import { type UserUseCase } from '../user/user-usecase'

export class CompanyUseCase implements ICompanyDataAccess {
  public companyUseCase: ICompanyCreateUseCase
  public userUseCase: UserUseCase
  public validation: ValidationUser

  constructor (companyUseCase: ICompanyCreateUseCase, userUseCase: UserUseCase) {
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
      const companyResponse = await this.companyUseCase.createCompany(company)
      delete company._id
      const user = {
        name: company.name,
        email: company.email,
        password: company.password,
        createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        profilePicture: company.profilePicture,
        createWithGoogle: company.createWithGoogle,
        companyId: companyResponse.data._id,
        createdBy: companyResponse.data._id
      }
      const userResponse = await this.userUseCase.createUser(user, true)
      return {
        message: 'Empresa e usuário inicial criado com sucesso',
        data: {
          company: {
            ...companyResponse.data
          },
          user: {
            ...userResponse.data
          }
        }
      }
    }
  }
}
