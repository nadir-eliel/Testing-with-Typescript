import { StringUtils, getStringInfo, toUpperCase } from "../app/utils"

describe('Utils test suite', () => {
    it('should return uppercase', () => {
        const result = toUpperCase('abc')
        expect(result).toBe('ABC')
    })
})
// Example of Jest Matchers 
describe('getStringInfo for arg My-String should', () => {
    test('return right length', () => {
        const actual = getStringInfo('My-String');
        expect(actual.characters).toHaveLength(9);
    });
    test('return right lower case', () => {
        const actual = getStringInfo('My-String');
        expect(actual.lowercase).toBe('my-string');
    });
    test('return right upper case', () => {
        const actual = getStringInfo('My-String');
        expect(actual.upperCase).toBe('MY-STRING');
    });
    test('return right characters', () => {
        const actual = getStringInfo('My-String');
        expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']);
        expect(actual.characters).toContain<string>('M');
        expect(actual.characters).toEqual(
            expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', '-'])
        );
    });
    test('return defined extra info', () => {
        const actual = getStringInfo('My-String');
        expect(actual.extraInfo).toBeDefined();
    });

    test('return right extra info', () => {
        const actual = getStringInfo('My-String');
        expect(actual.extraInfo).toEqual({})
    });
});

// Example of Parametrized tests
describe('ToUpperCase examples', () => {
    it.each([
        { input: 'abc', expected: 'ABC' },
        { input: 'My-String', expected: 'MY-STRING' }])
        ('$input toUpperCase should be $expected', ({ input, expected }) => {
            const actual = toUpperCase(input)
            expect(actual).toBe(expected)
        })
})

// Example of Errors and BeforeEach Hook
describe('StringUtils tests', ()=>{

    let sut: StringUtils;

    beforeEach(()=>{
        sut = new StringUtils();
    })
    
    it.only('Should return correct upperCase', ()=>{
        const actual = sut.toUpperCase('abc');
        expect(actual).toBe('ABC');
    })

    it('Should throw error on invalid argument - function', ()=>{
        function expectError() {
            const actual = sut.toUpperCase('');
        }            
        expect(expectError).toThrow('Invalid argument!');
    })

    it('Should throw error on invalid argument - arrow function', ()=>{      
        expect(()=>{
            sut.toUpperCase('');
        }).toThrow('Invalid argument!');
    })

    it('Should throw error on invalid argument - try catch block', (done)=>{             
        try {
            sut.toUpperCase('');
            done('GetStringInfo should throw error for invalid arg!')
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty('message', 'Invalid argument!');
            done();
        }

    })

    it.todo('This test should be implemented in the future')
});
