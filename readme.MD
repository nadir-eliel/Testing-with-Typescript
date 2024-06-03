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