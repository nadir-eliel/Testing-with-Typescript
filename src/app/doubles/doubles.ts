import { v4 } from "uuid"

export type stringInfo = {
    lowercase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfo: Object | undefined
}
// Example to test with Stubs
export function calculateComplexity(stringInfo: stringInfo) {
    return Object.keys(stringInfo.extraInfo).length * stringInfo.length
}

export function toUpperCase(arg: string) {
    return arg.toUpperCase()
}


export function toLowerCaseWithId(arg: string) {
    return arg.toLowerCase() + v4()
}

// Example to test with FAKES
type LoggerServiceCallback = (arg: string) => void
export function toUpperCaseWithCb(arg: string, callback: LoggerServiceCallback) {
    if (!arg) {
        callback('invalid argument!')
        return
    }
    callback(`function called with ${arg}`)
    return arg.toUpperCase()
}
// Mocks => functions // Spies => Classes
// Spies are not directly injected into SUT (system under test)
// Original functionality is preserved with spies
// Spies usually track method calls

export class OtherStringUtils {
    public toUpperCase(arg: string) {
        return arg.toUpperCase()
    }

    public logString(arg: string) {
        console.log(arg)
    }
}
