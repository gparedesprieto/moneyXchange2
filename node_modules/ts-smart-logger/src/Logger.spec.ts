import {LoggerFactory} from './LoggerFactory';
import {ILogger} from './ILogger';
import {IEnvironmentLogger} from './IEnvironmentLogger';
import {LoggerLevelEnum} from './LoggerLevelEnum';

describe('Logger', ()=> {

    describe('Checking the default configuration', ()=> {

        it('Checking the payload logging', ()=> {

            let debugCalled:boolean = false,
                errorCalled:boolean = false;

            console.debug = function (...args) {
                expect(args[0]).toEqual(300);
                expect(args[1]).toEqual(300);
            };

            console.error = function (...args) {
                expect(args[0]).toEqual(600);
                expect(args[1]).toEqual(900);
            };

            class LoggedFirstClass {
                private logger:ILogger = LoggerFactory.makeLogger(LoggedFirstClass);

                public logAtFirstClass() {
                    this.logger.debug((logger:IEnvironmentLogger) => {
                        debugCalled = true;

                        const i = 100 + 200;
                        logger.write(300, i);
                    });

                    this.logger.error((logger:IEnvironmentLogger) => {
                        errorCalled = true;

                        const i = 400 + 500;
                        logger.write(600, i);
                    });
                }
            }

            new LoggedFirstClass().logAtFirstClass();

            expect(debugCalled).toEqual(true);
            expect(errorCalled).toEqual(true);
        });
    });

    describe('Checking the custom configuration', ()=> {
        describe('Checking the debug log level', ()=> {

            it('Checking the payload logging', ()=> {
                let debugCalled:boolean = false,
                    errorCalled:boolean = false;

                class LoggedFirstClass {
                    private logger:ILogger = LoggerFactory.makeLogger(LoggedFirstClass);

                    public logAtFirstClass() {
                        this.logger.debug((logger:IEnvironmentLogger) => {
                            debugCalled = true;
                        });

                        this.logger.error((logger:IEnvironmentLogger) => {
                            errorCalled = true;
                        });
                    }
                }

                LoggerFactory.configure({
                    logLevel: LoggerLevelEnum.DEBUG_LEVEL
                });

                new LoggedFirstClass().logAtFirstClass();

                expect(debugCalled).toEqual(true);
                expect(errorCalled).toEqual(true);
            });
        });

        describe('Checking the error log level', ()=> {

            it('Checking the payload logging', ()=> {
                let debugCalled:boolean = false,
                    logCalled:boolean = false,
                    errorCalled:boolean = false;

                class LoggedFirstClass {
                    private logger:ILogger = LoggerFactory.makeLogger(LoggedFirstClass);

                    public logAtFirstClass() {
                        this.logger.debug((logger:IEnvironmentLogger) => {
                            debugCalled = true;
                        });

                        this.logger.log((logger:IEnvironmentLogger) => {
                            logCalled = true;
                        });

                        this.logger.error((logger:IEnvironmentLogger) => {
                            errorCalled = true;
                        });
                    }
                }

                LoggerFactory.configure({
                    logLevel: LoggerLevelEnum.ERROR_LEVEL
                });

                new LoggedFirstClass().logAtFirstClass();

                expect(debugCalled).toEqual(false);
                expect(logCalled).toEqual(false);
                expect(errorCalled).toEqual(true);
            });
        });
    });
});
