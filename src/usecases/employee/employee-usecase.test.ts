import { type EmployeeEntity } from '../../entities/employee/employee-entity'
import { type IEmployeeCreateUseCase } from './port/employee-port'
import { EmployeeUseCase } from './employee-usecase'

describe('EmployeeUseCase', () => {
  let employeeUseCase: EmployeeUseCase
  let mockRepository: jest.Mocked<IEmployeeCreateUseCase>
  let employeeEntity: EmployeeEntity

  beforeEach(() => {
    mockRepository = {
      createEmployee: jest.fn(),
      editEmployee: jest.fn(),
      getEmployee: jest.fn(),
      deleteEmployee: jest.fn()
    }
    employeeEntity = {
      _id: 'someId',
      name: 'Name Valid',
      email: 'someEmail@someEmail.com',
      createdAt: 'someDate',
      cpf: 'someCpf',
      nickname: 'someNickname',
      phoneNumber: 'somePhoneNumber',
      birthday: 'someBirthday',
      gender: 'someGender',
      additionalInformation: 'someAdditionalInformation',
      zipCode: 'someZipCode',
      street: 'someStreet',
      houseNumber: 'someHouseNumber',
      complement: 'someComplement',
      neighborhood: 'someNeighborhood',
      stateOfTheCountry: 'someStateOfTheCountry',
      city: 'someCity',
      createdByTheCompanyId: 'someCreatedByTheCompanyId',
      department: 'someDepartment',
      office: 'someOffice',
      hiringDate: 'someHiringDate',
      wage: 'someWage'
    }

    employeeUseCase = new EmployeeUseCase(mockRepository)
  })

  describe('createEmployee', () => {
    it('should create an employee successfully', async () => {
      const expectedResponse = {
        message: 'Colaborador criado com sucesso',
        data: employeeEntity
      }

      mockRepository.createEmployee.mockResolvedValueOnce({ data: employeeEntity })

      const result = await employeeUseCase.createEmployee(employeeEntity)

      expect(mockRepository.createEmployee).toHaveBeenCalledWith(employeeEntity)
      expect(result).toEqual(expectedResponse)
    })

    it('should return an invalid email message if email is not valid', async () => {
      employeeEntity.email = ''
      const expectedResponse = {
        message: 'E-mail não é valido'
      }

      const result = await employeeUseCase.createEmployee(employeeEntity)

      expect(result).toEqual(expectedResponse)
    })

    it('should return an invalid name message if name is not valid', async () => {
      employeeEntity.name = ''
      const expectedResponse = {
        message: 'Nome não é valido'
      }

      const result = await employeeUseCase.createEmployee(employeeEntity)

      expect(result).toEqual(expectedResponse)
    })
  })

  describe('editEmployee', () => {
    it('should edit an employee successfully', async () => {
      const employeeId = 'someId'
      const expectedResponse = {
        message: 'Colaborador editado com sucesso',
        data: employeeEntity
      }

      mockRepository.editEmployee.mockResolvedValueOnce({ data: employeeEntity })

      const result = await employeeUseCase.editEmployee(employeeId, employeeEntity)

      expect(mockRepository.editEmployee).toHaveBeenCalledWith(employeeId, employeeEntity)
      expect(result).toEqual(expectedResponse)
    })

    it('should return an invalid email message if email is not valid', async () => {
      const employeeId = 'someId'
      employeeEntity.email = ''
      const expectedResponse = {
        message: 'E-mail não é valido'
      }

      const result = await employeeUseCase.editEmployee(employeeId, employeeEntity)

      expect(result).toEqual(expectedResponse)
    })

    it('should return an invalid name message if name is not valid', async () => {
      const employeeId = 'someId'
      employeeEntity.name = ''
      const expectedResponse = {
        message: 'Nome não é valido'
      }

      const result = await employeeUseCase.editEmployee(employeeId, employeeEntity)

      expect(result).toEqual(expectedResponse)
    })
  })

  describe('getEmployee', () => {
    it('should get an employee successfully', async () => {
      const companyId = 'someCompanyId'
      const expectedResponse = {
        data: employeeEntity
      }

      mockRepository.getEmployee.mockResolvedValueOnce(employeeEntity)

      const result = await employeeUseCase.getEmployee(companyId)

      expect(mockRepository.getEmployee).toHaveBeenCalledWith(companyId)
      expect(result).toEqual(expectedResponse)
    })

    it('should return a not found message if employee is not found', async () => {
      const companyId = 'nonexistentCompanyId'
      const expectedResponse = {
        message: 'Colaborador não encontrado'
      }

      mockRepository.getEmployee.mockResolvedValueOnce(null)

      const result = await employeeUseCase.getEmployee(companyId)

      expect(mockRepository.getEmployee).toHaveBeenCalledWith(companyId)
      expect(result).toEqual(expectedResponse)
    })
  })

  describe('deleteEmployee', () => {
    it('should delete an employee successfully', async () => {
      const employeeId = 'someEmployeeId'
      const expectedResponse = {
        message: 'Colaborador deletado com sucesso',
        data: employeeEntity
      }

      mockRepository.deleteEmployee.mockResolvedValueOnce({ data: employeeEntity })

      const result = await employeeUseCase.deleteEmployee(employeeId)

      expect(mockRepository.deleteEmployee).toHaveBeenCalledWith(employeeId)
      expect(result).toEqual(expectedResponse)
    })

    it('should return a not found message if employee is not found', async () => {
      const employeeId = 'nonexistentEmployeeId'
      const expectedResponse = {
        message: 'Colaborador não encontrado'
      }

      mockRepository.deleteEmployee.mockResolvedValueOnce(null)

      const result = await employeeUseCase.deleteEmployee(employeeId)

      expect(mockRepository.deleteEmployee).toHaveBeenCalledWith(employeeId)
      expect(result).toEqual(expectedResponse)
    })
  })
})
