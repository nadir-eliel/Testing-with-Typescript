import { DataBase } from "../../../app/server_app/data/DataBase"
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess"
import { Account } from "../../../app/server_app/model/AuthModel"

const insertMock = jest.fn()
const getByMock = jest.fn()

jest.mock("../../../app/server_app/data/DataBase", () => {
    return {
        DataBase: jest.fn().mockImplementation(() => {
            return {
                insert: insertMock,
                getBy: getByMock
            }
        })
    }
})

describe('UserCredentialsDataAccess test suite', () => {

    let sut: UserCredentialsDataAccess
    const someAccount: Account = {
        id: '',
        password: 'passExample',
        userName: 'nameExample'
    }
    const someId = '12345'

    beforeEach(() => {
        sut = new UserCredentialsDataAccess()
        // const dataBase: DataBase
        expect(DataBase).toHaveBeenCalledTimes(1)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should add user and return the id ', async () => {
        insertMock.mockResolvedValueOnce(someId)
        const actualId = await sut.addUser(someAccount)
        expect(actualId).toBe(someId)
        expect(insertMock).toHaveBeenCalledWith(someAccount)
    })

    it('should get an user given an Id', async () => {
        getByMock.mockResolvedValueOnce(someAccount)
        const actual = await sut.getUserById(someId)
        expect(actual).toEqual(someAccount)
        expect(getByMock).toHaveBeenCalledWith('id', someId)

    })
    it('should get an user given an name', async () => {
        getByMock.mockResolvedValueOnce(someAccount)
        const actual = await sut.getUserByUserName(someAccount.userName)
        expect(actual).toEqual(someAccount)
        expect(getByMock).toHaveBeenCalledWith('userName', 'someAccount.userName')

    })
})

/** En este ejemplo, se utilizan mocks para reemplazar una instancia de la clase
 * DataBase que se crea dentro de la clase UserCredentialsDataAccess
 * Creo que lo ideal seria usar inyeccion de dependencias al crear instancias de 
 * UserCredentialsDataAccess. Tal vez seria mas facil de testear.
 */