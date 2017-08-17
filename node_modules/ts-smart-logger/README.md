# ts-smart-logger

An implementation of logger at TypeScript (TS 2 compatible).

## Installation

First you need to install the npm module:
```sh
npm install ts-smart-logger --save
```

## Use

**main.ts**
```typescript
// Configure the logger before loading the all internal classes
import {LoggerFactory} from 'ts-smart-logger/index';

LoggerFactory.configure();
// or
LoggerFactory.configure({"logLevel": 3});
// or
LoggerFactory.configure(require('./config/log/default.json'));
// or
LoggerFactory.configure(require('./config/log/ProductionLoggerConfig').ProductionLoggerConfig);
```

**LoggedFirstClass.ts**
```typescript
class LoggedFirstClass {
   private logger:ILogger = LoggerFactory.makeLogger(LoggedFirstClass);

   public logAtFirstClass() {
       this.logger.info(1);                                    // <=> console.info(1);
       this.logger.warn(() => 2);                              // <=> console.warn(2);
       this.logger.error(new Error("3"));                      // <=> console.error(new Error("3"));

       this.logger.info(1, 2, 3);                              // <=> console.info(1, 2, 3);
       this.logger.warn(() => [1, 2, 3]);                      // <=> console.warn([1, 2, 3]);
       this.logger.error("Custom error:", new Error("2"));     // <=> console.error("Custom error:", new Error("2"));
       this.logger.debug((logger:IEnvironmentLogger) => {
           // Here may be different kinds of complex calculations, performed only in logging mode
           logger.write('Debug log mode enabled: ', 1, 2, 3);  // <=> console.debug('Debug log mode enabled: ', 1, 2, 3);
       });
       this.logger.warn((logger:IEnvironmentLogger) => {
           // Here may be different kinds of complex calculations, performed only in logging mode
           logger.write('Warn log mode enabled: ', 1, 2, 3);   // <=> console.warn('Warn log mode enabled: ', 1, 2, 3);
           return [1, 2, 3].length;                            // <=> console.warn([1, 2, 3].length);
       });
   }
}
```

**config.json**
```json
{
    "debugLevelPath": "[0-9]+",
    "infoLevelPath": ".",
    "logLevelPath": ".",
    "warnLevelPath": ".",
    "errorLevelPath": "[^LoggedFirstClass]",
    "logLevel": 3
}
```

**Configure the runtime**
```typescript
$$LoggerFactory.storeConfig({"errorLevelPath": "[^Main]", "logLevel": 3})
```

**Attention**
Since the "LoggerFactory" may be shared between the different [dependencies](https://docs.npmjs.com/how-npm-works/npm3-dupe) 
we must include the script "npm dedupe" in this case into the package.json:
```json
  ...
  "scripts": {
    "postinstall": "npm dedupe && ...",
  },
  ...
```   
   
![Configure the runtime](demo/configure.png)

## Publish

```sh
npm run deploy
```

## License

Licensed under MIT.