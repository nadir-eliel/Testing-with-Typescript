STEP BY STEP
```npm init -y```

- Dependencias necesarias
```npm i -DE typescript jest ts-jest @types/jest ts-node```

- agregamos la configuracion de Jest
```npx ts-jest config:init```

originalmente crea un archivo .js, pero se puede cambiar a un archivo de configuracion .ts
borrar el archivo jest.config.js y crear uno .ts

Probablemente al ejecutar el primer test, veamos este WARN:

```PS C:\Users\Pochi\Documents\repos\Testing-with-Typescript> npm test
> testing-with-typescript@1.0.0 test
> jest
ts-jest[config] (WARN) message TS151001: If you have issues related to imports, you should consider setting `esModuleInterop` to `true` in your TypeScript configuration file (usually `tsconfig.json`). See https://blogs.msdn.microsoft.com/typescript/2018/01/31/announcing-typescript-2-7/#easier-ecmascript-module-interoperability for more information.```

Se resuelve creando un archivo de configuracion de Typescript (tsconfig.json)

``` {
    "compilerOptions": {
        "esModuleInterop": true
    }
} ```


FIRST principles:
FAST: unit test should be fast (faster tests - faster feedback)
ISOLATED/INDEPENDENT: should be isolated from: other tests, external environment 
    (no shared state with other tests, the order in which tests runshould not matter)
REPEATABLE: same result with the same input. 
    Random/Date values => we will ofter mock these
    Test that writes to a database: It should always clean up
SELF VALIDATING
    after the thest is finished, the result should be: pass or fail.
THOROUGH:
    cover all the cases/path/scenarios
    happy cases, bad paths, edge cases
    Invalid output
    Large values
    100% code coverage -> not a great indicator :) 

Para testear errores, hay que envolverlo que queremos testear dentro de otra funcion
y usar los matchers: toThrow() y toThrowError('message')

Doubles in practice: 
TDD styles/schools: London and Chicago(Detroit)

**Chicago:** 
a unit: a collection of pieces 
low focus on mocks

**London:**
a unit: a class
heavy use of mocks