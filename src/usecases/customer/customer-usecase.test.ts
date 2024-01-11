import { type CustomerData } from '../../entities/customer/customer-entity'
import { type ICustomerUseCase } from './port/customer-port'
import { CustomerUseCase } from './customer-usecase'

describe('CustomerUseCase', () => {
  let customerUseCase: CustomerUseCase
  let mockRepository: jest.Mocked<ICustomerUseCase>
  let customerData: CustomerData
  beforeEach(() => {
    mockRepository = {
      createCustomer: jest.fn(),
      editCustomer: jest.fn(),
      getCustomer: jest.fn(),
      deleteCustomer: jest.fn()
    }

    customerUseCase = new CustomerUseCase(mockRepository)
    customerData = {
      _id: 'someId',
      name: 'Name Valid',
      email: 'someEmail@someEmail.com',
      createdAt: 'someDate',
      cpf: 'someCpf',
      cnpj: 'someCnpj',
      nickname: 'someNickname',
      phoneNumber: 'somePhoneNumber',
      birthday: 'someBirthday',
      gender: 'someGender',
      legalResponsible: 'someLegalResponsible',
      fantasyName: 'someFantasyName',
      stateRegistration: 'someStateRegistration',
      additionalInformation: 'someAdditionalInformation',
      zipCode: 'someZipCode',
      street: 'someStreet',
      houseNumber: 'someHouseNumber',
      complement: 'someComplement',
      neighborhood: 'someNeighborhood',
      stateOfTheCountry: 'someStateOfTheCountry',
      city: 'someCity',
      typeCustomer: 'someTypeCustomer',
      createdByTheCompanyId: 'someCreatedByTheCompanyId',
      editAt: 'someEditAt'
    }
  })

  describe('createCustomer', () => {
    beforeEach(() => {
      mockRepository.createCustomer.mockResolvedValueOnce({ data: customerData })
    })

    it('should create a customer successfully', async () => {
      const expectedResponse = {
        message: 'Cliente criado com sucesso',
        data: customerData
      }

      const result = await customerUseCase.createCustomer(customerData)

      expect(result).toEqual(expectedResponse)
    })

    it('should return an invalid email message if email is not valid', async () => {
      customerData.email = ''
      const expectedResponse = {
        message: 'E-mail não é valido'
      }

      const result = await customerUseCase.createCustomer(customerData)

      expect(result).toEqual(expectedResponse)
    })

    it('should return an invalid name message if name is not valid', async () => {
      customerData.email = 'emailvalid@email.com'
      customerData.name = ''
      const expectedResponse = {
        message: 'Nome não é valido'
      }

      const result = await customerUseCase.createCustomer(customerData)

      expect(result).toEqual(expectedResponse)
    })
  })

  describe('editCustomer', () => {
    it('should edit a customer successfully', async () => {
      const customerId = 'someId'
      const expectedResponse = {
        message: 'Cliente editado com sucesso',
        data: { ...customerData }
      }

      mockRepository.editCustomer.mockResolvedValueOnce({ data: customerData })

      const result = await customerUseCase.editCustomer(customerId, customerData)

      expect(mockRepository.editCustomer).toHaveBeenCalledWith(customerId, customerData)
      expect(result).toEqual(expectedResponse)
    })

    it('should return an invalid email message if email is not valid', async () => {
      const customerId = 'someId'
      customerData.email = ''
      const expectedResponse = {
        message: 'E-mail não é valido'
      }

      const result = await customerUseCase.editCustomer(customerId, customerData)

      expect(result).toEqual(expectedResponse)
    })

    it('should return an invalid name message if name is not valid', async () => {
      const customerId = 'someId'
      customerData.name = ''
      const expectedResponse = {
        message: 'Nome não é valido'
      }

      const result = await customerUseCase.editCustomer(customerId, customerData)

      expect(result).toEqual(expectedResponse)
    })
  })

  describe('getCustomer', () => {
    it('should get a customer successfully', async () => {
      const companyId = 'someCompanyId'
      const expectedResponse = {
        data: customerData
      }

      mockRepository.getCustomer.mockResolvedValueOnce({ data: customerData })

      const result = await customerUseCase.getCustomer(companyId)

      expect(mockRepository.getCustomer).toHaveBeenCalledWith(companyId)
      expect(result).toEqual(expectedResponse)
    })

    it('should return a not found message if customer is not found', async () => {
      const companyId = 'nonexistentCompanyId'
      const expectedResponse = {
        message: 'Cliente não encontrado'
      }

      mockRepository.getCustomer.mockResolvedValueOnce(null)

      const result = await customerUseCase.getCustomer(companyId)

      expect(mockRepository.getCustomer).toHaveBeenCalledWith(companyId)
      expect(result).toEqual(expectedResponse)
    })
  })

  describe('deleteCustomer', () => {
    it('should delete a customer successfully', async () => {
      const customerId = 'someCustomerId'
      const expectedResponse = {
        message: 'Cliente deletado com sucesso',
        data: customerData
      }

      mockRepository.deleteCustomer.mockResolvedValueOnce({ data: customerData })

      const result = await customerUseCase.deleteCustomer(customerId)

      expect(mockRepository.deleteCustomer).toHaveBeenCalledWith(customerId)
      expect(result).toEqual(expectedResponse)
    })

    it('should return a not found message if customer is not found', async () => {
      const customerId = 'nonexistentCustomerId'
      const expectedResponse = {
        message: 'Cliente não encontrado'
      }

      mockRepository.deleteCustomer.mockResolvedValueOnce(null)

      const result = await customerUseCase.deleteCustomer(customerId)

      expect(mockRepository.deleteCustomer).toHaveBeenCalledWith(customerId)
      expect(result).toEqual(expectedResponse)
    })
  })
})
