import {ILogger} from './ILogger';
import {ILoggerConfig} from './ILoggerConfig';
import {LoggerPayload} from './ILogger';
import {ILoggerCallback} from './ILoggerCallback';
import {LoggerLevelEnum} from './LoggerLevelEnum';
import {Utils} from './Utils';

const CONSOLE_FN_DICTIONARY = {
    [LoggerLevelEnum.DEBUG_LEVEL]: 'debug',
    [LoggerLevelEnum.INFO_LEVEL]: 'info',
    [LoggerLevelEnum.NOTICE_LEVEL]: 'log',
    [LoggerLevelEnum.WARN_LEVEL]: 'warn',
    [LoggerLevelEnum.ERROR_LEVEL]: 'error'
};

/**
 * Customizable logging mechanism. The logger should be instantiated via @class LoggerFactory as a member of a class or
 * as a static field.
 *
 * @example:
 *
 * class LoggedFirstClass {
 *
 *  private logger:ILogger = LoggerFactory.makeLogger(LoggedFirstClass);
 *
 *  public logAtFirstClass() {
 *       this.logger.info(1);                                    // <=> console.info(1);
 *       this.logger.warn(() => 2);                              // <=> console.warn(2);
 *       this.logger.error(new Error("3"));                      // <=> console.error(new Error("3"));
 *
 *       this.logger.info(1, 2, 3);                              // <=> console.info(1, 2, 3);
 *       this.logger.warn(() => [1, 2, 3]);                      // <=> console.warn([1, 2, 3]);
 *       this.logger.error("Custom error:", new Error("2"));     // <=> console.error("Custom error:", new Error("2"));
 *       this.logger.debug((logger:IEnvironmentLogger) => {
 *           // Here may be different kinds of complex calculations, performed only in logging mode
 *           logger.write('Debug log mode enabled: ', 1, 2, 3);  // <=> console.debug('Debug log mode enabled: ', 1, 2, 3);
 *       });
 *       this.logger.warn((logger:IEnvironmentLogger) => {
 *           // Here may be different kinds of complex calculations, performed only in logging mode
 *           logger.write('Warn log mode enabled: ', 1, 2, 3);   // <=> console.warn('Warn log mode enabled: ', 1, 2, 3);
 *           return [1, 2, 3].length;                            // <=> console.warn([1, 2, 3].length);
 *       });
 *   }
 *}
 */
export class Logger implements ILogger {

    private loggerConfig:ILoggerConfig;
    private loggedClass:string|Function;

    constructor(loggerConfig:ILoggerConfig) {
        this.loggerConfig = loggerConfig;
    }

    /**
     * @description: Allows to specify exactly the business logic class for logging.
     * @example:
     *  class MyClass {}
     *  ...
     *  setLoggedClass(MyClass)
     *
     * @param loggedClass The business logic class (optional parameter)
     * @returns {Logger} The current logger
     */
    public setLoggedClass(loggedClass?:string|Function):ILogger {
        this.loggedClass = loggedClass;
        return this;
    }

    /**
     * @override
     */
    public debug(...payloads:LoggerPayload[]) {
        this.write(LoggerLevelEnum.DEBUG_LEVEL, this.loggerConfig.debugLevelPath, payloads);
    }

    /**
     * @override
     */
    public info(...payloads:LoggerPayload[]) {
        this.write(LoggerLevelEnum.INFO_LEVEL, this.loggerConfig.infoLevelPath, payloads);
    }

    /**
     * @override
     */
    public log(...payloads:LoggerPayload[]) {
        this.write(LoggerLevelEnum.NOTICE_LEVEL, this.loggerConfig.logLevelPath, payloads);
    }

    /**
     * @override
     */
    public warn(...payloads:LoggerPayload[]) {
        this.write(LoggerLevelEnum.WARN_LEVEL, this.loggerConfig.warnLevelPath, payloads);
    }

    /**
     * @override
     */
    public error(...payloads:LoggerPayload[]) {
        this.write(LoggerLevelEnum.ERROR_LEVEL, this.loggerConfig.errorLevelPath, payloads);
    }

    /**
     * @override
     */
    public isDebugEnabled():boolean {
        return this.loggerConfig.logLevel >= LoggerLevelEnum.DEBUG_LEVEL;
    }

    /**
     * @override
     */
    public isInfoEnabled():boolean {
        return this.loggerConfig.logLevel >= LoggerLevelEnum.INFO_LEVEL;
    }

    /**
     * @override
     */
    public isLogEnabled():boolean {
        return this.loggerConfig.logLevel >= LoggerLevelEnum.INFO_LEVEL;
    }

    /**
     * @override
     */
    public isWarnEnabled():boolean {
        return this.loggerConfig.logLevel >= LoggerLevelEnum.WARN_LEVEL;
    }

    /**
     * @override
     */
    public isErrorEnabled():boolean {
        return this.loggerConfig.logLevel >= LoggerLevelEnum.ERROR_LEVEL;
    }

    /**
     * Write the message into an output stream or perform payload if it is presented as a callback function.
     *
     * @param logLevel The log level
     * @param configuredLevelPath The regular expression for filtering payloads by their belonging to a specific class
     * @param payloads The payload for logging (message or callback for execution)
     */
    private write(logLevel:LoggerLevelEnum, configuredLevelPath:string, ...payloads:LoggerPayload[]) {
        if (logLevel > this.loggerConfig.logLevel) {
            return;
        }

        const loggedClassName:string = this.getLoggedClassName();
        if (Utils.isPresent(loggedClassName)
            && Utils.isPresent(configuredLevelPath)
            && !new RegExp(configuredLevelPath).test(loggedClassName)) {
            return;
        }

        const consoleFn:Function = console[CONSOLE_FN_DICTIONARY[logLevel]];

        payloads.forEach((payload:LoggerPayload) => {
            if (Utils.isArray(payload)) {
                if ((payload as Array<any>).length && Utils.isFunction(payload[0])) {
                    const returnsPayload = (payload[0] as ILoggerCallback)({
                        write(...parameters) {
                            consoleFn.apply(console, parameters);
                        }
                    });
                    if (Utils.isPresent(returnsPayload)) {
                        consoleFn.call(console, returnsPayload);
                    }
                } else {
                    consoleFn.apply(console, payload);
                }
            } else {
                consoleFn.call(console, payload);
            }
        });
    }

    private getLoggedClassName():string {
        if (!Utils.isPresent(this.loggedClass)) {
            return null;
        }
        return Utils.isString(this.loggedClass) ? this.loggedClass as string : (this.loggedClass as Function).name;
    }
}
