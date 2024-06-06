import { IncomingMessage } from "http";
import { getRequestBody } from "../../../app/server_app/utils/Utils";

const requestMock = {
    on: jest.fn()
}

const someObject = {
    name: 'name',
    age: 30,
    city: 'Auckland'
}

const someObjectAsString = JSON.stringify(someObject)


describe('getRequestBody', () => {
    it('should return object for valid JSON', async () => {
        requestMock.on.mockImplementation((event, cb) => {
            if (event === 'data') {
                cb(someObjectAsString)
            } else {
                cb()
            }
        })

        const actual = await getRequestBody(requestMock as any as IncomingMessage)

        expect(actual).toEqual(someObject);
    });

    it('should throw error for invalid JSON', async () => {
        requestMock.on.mockImplementation((event, cb) => {
            if (event === 'data') {
                // Esto no va a funcionar porque no es un valid JSON
                cb('a' + someObjectAsString)
            } else {
                cb()
            }
        })

        await expect(getRequestBody(requestMock as any)).rejects
            .toThrow("Unexpected token 'a', \"a{\"name\":\"\"... is not valid JSON")
    });

    it('should throw error for unexpected error', async () => {
        const someError = new Error('Sth went wrong!')
        requestMock.on.mockImplementation((event, cb) => {
            if (event == 'error') {
                cb(someError)
            }
        })

        await expect(getRequestBody(requestMock as any)).rejects
            .toThrow(someError.message)
    });
});