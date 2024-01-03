import { type EmployeeI } from '../../usecases/employee/port/employee-port'
import { type IEmployeeDataAccess } from '../../usecases/employee/port/employee-data-access'
import { MongoConnection } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class EmployeeRepositoryInfra implements IEmployeeDataAccess {
  async createEmployee (employee: EmployeeI): Promise<any> {
    const employeeCollection = MongoConnection.getCollection('employees')
    const exists = await this.exists(employee)
    if ((!exists)) {
      const employeeInserted = await employeeCollection.insertOne(employee)
      return {
        data: {
          ...employee,
          _id: employeeInserted.insertedId
        }
      }
    } else {
      throw new Error('Já existe um colaborador com este e-mail')
    }
  }

  async findEmployeeByEmailOrId (employee: any): Promise<any> {
    const employeeCollection = MongoConnection.getCollection('employees')
    let result: any | null
    if (employee.email.includes('@')) {
      result = await employeeCollection.findOne({ email: employee.email, createdByTheCompanyId: employee.createdByTheCompanyId })
    } else {
      const objectId = new ObjectId(employee._id)
      result = await employeeCollection.findOne({ _id: objectId })
    }
    if (result != null) {
      const objectId = new ObjectId(result._id)
      await employeeCollection.updateOne(
        { _id: objectId },
        { $set: result }
      )
    }
    return result
  }

  async findAllEmployees (companyId: string): Promise<any> {
    const employeeCollection = MongoConnection.getCollection('employees')
    const result = await employeeCollection.find({ createdByTheCompanyId: companyId }).toArray()
    return result
  }

  async exists (employee: any): Promise<boolean> {
    const result = await this.findEmployeeByEmailOrId(employee)
    if (result != null) {
      return true
    } else {
      return false
    }
  }

  async getEmployee (companyId: string): Promise<any> {
    const employee = await this.findAllEmployees(companyId)
    if (employee) {
      return { data: employee }
    } else {
      return { message: 'Colaborador não encontrado' }
    }
  }

  async editEmployee (_id: string, updatedEmployeeData: any): Promise<any> {
    const employeeCollection = MongoConnection.getCollection('employees')
    const objectId = new ObjectId(_id)
    delete updatedEmployeeData._id
    const employee = await employeeCollection.updateOne(
      { _id: objectId },
      { $set: updatedEmployeeData }
    )

    if (employee) {
      updatedEmployeeData._id = _id
      return { data: updatedEmployeeData }
    } else {
      return { message: 'Colaborador não encontrado' }
    }
  }

  async deleteEmployee (_id: string): Promise<any> {
    const employeeCollection = MongoConnection.getCollection('employees')
    const objectId = new ObjectId(_id)
    const employee = await employeeCollection.deleteOne({ _id: objectId })
    if (employee) {
      return { message: 'Colaborador deletado com sucesso', data: await employeeCollection.find({}).toArray() }
    } else {
      return { message: 'Colaborador não encontrado' }
    }
  }
}
