import { OtherStringUtils, calculateComplexity, toUpperCaseWithCb } from "../../app/doubles/doubles"

describe('Doubles test suite', () => {

    // STUBS EXAMPLE
    it('calculate complexity', () => {
        const someInfo = {
            length: 5,
            extraInfo: {
                field1: 'someInfo',
                field2: 'otherInfo'
            }
        }

        const actual = calculateComplexity(someInfo as any)
        expect(actual).toBe(10)
    })

    // FAKES EXAMPLE
    /** El callback requiere cualquier funcion que tenga como paramtro un string
     * Esto esta definido con el type: LoggerServiceCallback
     * por eso con una funcion vacía tambien sirve */

    it('ToUpperCase - calls callback for invalid argument', () => {
        const actual = toUpperCaseWithCb('', () => { })
        expect(actual).toBeUndefined()
    })

    it('ToUpperCase - calls callback for valid argument', () => {
        const actual = toUpperCaseWithCb('abc', () => { })
        expect(actual).toBe('ABC')
    })

})

describe('Mocks Examples test suite - Tracking callbacks', () => {
    // HANDMADE MOCK
    let callbackArgs = []
    let timesCalled = 0

    function callbackMock(arg: string) {
        callbackArgs.push(arg)
        timesCalled++
    }

    afterEach(() => { // Clearing tracking fields
        callbackArgs = []
        timesCalled = 0
    })

    it('ToUpperCase - calls callback for invalid argument - track calls', () => {
        const actual = toUpperCaseWithCb('', callbackMock)
        expect(actual).toBeUndefined()
        expect(callbackArgs).toContain('invalid argument!')
        expect(timesCalled).toBe(1)
    })

    it('ToUpperCase - calls callback for valid argument - track calls', () => {
        const actual = toUpperCaseWithCb('abc', callbackMock)
        expect(actual).toBe('ABC')
        expect(callbackArgs).toContain('function called with abc')
        expect(timesCalled).toBe(1)
    })

    // MOCK with Jest
})

describe('Tracking callbacks with Jest Mocks', () => {
    // JEST MOCK
    const callbackMock = jest.fn()

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('ToUpperCase - calls callback for invalid argument - track calls', () => {
        const actual = toUpperCaseWithCb('', callbackMock)
        expect(actual).toBeUndefined()
        expect(callbackMock).toHaveBeenCalled()
        expect(callbackMock).toHaveBeenCalledTimes(1)
    })

    it('ToUpperCase - calls callback for valid argument - track calls', () => {
        const actual = toUpperCaseWithCb('abc', callbackMock)
        expect(actual).toBe('ABC')
        expect(callbackMock).toHaveBeenCalledWith('function called with abc')
        expect(callbackMock).toHaveBeenCalledTimes(1)
    })

})

describe('OtherStringUtils tests with spies', () => {
    // SPIES EXAMPLE
    let sut: OtherStringUtils
    beforeEach(() => {
        sut = new OtherStringUtils()
    })
    it('Use a spy to track calls', () => {
        const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase')
        sut.toUpperCase('abc')
        expect(toUpperCaseSpy).toHaveBeenCalledWith('abc')
    })

    it('Use a spy to calls to other module', () => {
        const consoleLogSpy = jest.spyOn(sut, 'logString')
        sut.logString('abc')
        expect(consoleLogSpy).toHaveBeenCalledWith('abc')
    })

    it('Use a spy to replace the implemantation of a method', () => {
        jest.spyOn(sut, 'logString')
            .mockImplementation(() => {
                console.log('calling mocked implementation')
            })
        sut.logString('abc')
    })

})