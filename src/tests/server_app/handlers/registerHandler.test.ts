import { IncomingMessage, ServerResponse } from "http";
import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler"
import { HTTP_CODES, HTTP_METHODS } from "../../../app/server_app/model/ServerModel";
import { Account } from "../../../app/server_app/model/AuthModel";
// import { getRequestBody } from "../../../app/server_app/utils/Utils";

const getRequestBodyMock = jest.fn()

jest.mock("../../../app/server_app/utils/Utils", () => ({
    getRequestBody: () => getRequestBodyMock()
}))

describe('RegisterHadler test suite', () => {
    let sut: RegisterHandler

    const request = {
        method: undefined
    }
    const responseMock = {
        statusCode: 0,
        writeHead: jest.fn(),
        write: jest.fn()
    }

    const authorizerMock = {
        registerUser: jest.fn()
    }

    const someAccount: Account = {
        id: '',
        password: 'password',
        userName: 'user1'
    }

    const someId = '12345'
    beforeEach(() => {
        sut = new RegisterHandler(
            request as IncomingMessage,
            responseMock as any as ServerResponse,
            authorizerMock as any as Authorizer)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })


    it('should register valid accounts in requests', async () => {
        // The next 3 lines is the setup of the test
        request.method = HTTP_METHODS.POST
        getRequestBodyMock.mockResolvedValueOnce(someAccount)
        authorizerMock.registerUser.mockResolvedValueOnce(someId)

        // This is the real test
        await sut.handleRequest()
        expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED)
        expect(responseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.CREATED,
            { 'Content-Type': 'application/json' }
        )
        expect(responseMock.write).toHaveBeenCalledWith(
            JSON.stringify({ userId: someId })
        )
    })

    it('should not register invalid accounts in request', async () => {
        request.method = HTTP_METHODS.POST
        getRequestBodyMock.mockResolvedValueOnce({})
        await sut.handleRequest()

        expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
        expect(responseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.BAD_REQUEST,
            { 'Content-Type': 'application/json' }
        )
        expect(responseMock.write).toHaveBeenCalledWith(
            JSON.stringify('userName and password required')
        )
    })

    it('should do nothing for not supported http methods', async ()=> {
        request.method = HTTP_METHODS.GET
        await sut.handleRequest()

        expect(responseMock.writeHead).not.toHaveBeenCalled()
        expect(responseMock.write).not.toHaveBeenCalled()
        expect(getRequestBodyMock).not.toHaveBeenCalled()
    })
})