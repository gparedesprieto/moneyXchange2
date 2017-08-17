import {ILogger} from './ILogger';
import {Logger} from './Logger';
import {ILoggerConfig} from './ILoggerConfig';
import {LoggerLevelEnum} from './LoggerLevelEnum';
import {Utils} from './Utils';

const LOG_CONFIG_STORE_PARAMETER:string = "__logConfig",
    GLOBAL_LOGGER_FACTORY_PARAMETER:string = '$$LoggerFactory';

export const CONSOLE_DEBUG_FN = console.debug;
export const CONSOLE_INFO_FN = console.info;
export const CONSOLE_NOTICE_FN = console.log;
export const CONSOLE_WARN_FN = console.warn;
export const CONSOLE_ERROR_FN = console.error;

export class LoggerFactory {

    private static config:ILoggerConfig = {logLevel: LoggerLevelEnum.DEBUG_LEVEL};

    public static makeLogger(loggedClass?:string|Function):ILogger {
        return new Logger(this.config).setLoggedClass(loggedClass);
    }

    /**
     * Configure the factory of the loggers. It's main method necessarily need to call the runtime.
     *
     * @param outerConfig ILoggerConfig
     */
    public static configure(outerConfig?:{new ():ILoggerConfig}|ILoggerConfig) {
        const storedLoggerConfig:ILoggerConfig = this.tryGetFromStorage();

        // Formation of configuration based on the priority:
        //
        // The first priority: the config from localStorage
        // The second priority: the config from outer file
        // The third priority: the local config at current class

        this.config = Object.assign(
            {logLevel: LoggerLevelEnum.DEBUG_LEVEL},
            Utils.isFunction(outerConfig) ? new (outerConfig as {new ():ILoggerConfig})() : outerConfig,
            storedLoggerConfig
        );
        this.refreshEnvLoggersFunctions();
    }

    /**
     * The level of logging. It can be called the runtime
     *
     * @param logLevel The level of logging
     */
    public static configureLogLevel(logLevel:LoggerLevelEnum) {
        this.config.logLevel = logLevel;

        this.refreshEnvLoggersFunctions();
    }

    /**
     * Saving the configuration in the local storage
     *
     * @param config Config
     */
    public static storeConfig(config:ILoggerConfig) {
        Utils.isPresent(localStorage) && localStorage.setItem(LOG_CONFIG_STORE_PARAMETER, JSON.stringify(config));
    }

    private static tryGetFromStorage():ILoggerConfig {
        try {
            return Utils.isPresent(localStorage) ? <ILoggerConfig>JSON.parse(localStorage.getItem(LOG_CONFIG_STORE_PARAMETER)) : null;
        } catch (e) {
            return null;
        }
    }

    private static refreshEnvLoggersFunctions() {
        console.debug =
            console.info =
                console.log =
                    console.warn =
                        console.error = (() => {});

        console.assert = console.assert || (() => {});                    // It's for safe

        if (this.config.logLevel >= LoggerLevelEnum.ERROR_LEVEL) {
            console.error = CONSOLE_ERROR_FN;
        }
        if (this.config.logLevel >= LoggerLevelEnum.WARN_LEVEL) {
            console.warn = CONSOLE_WARN_FN;
        }
        if (this.config.logLevel >= LoggerLevelEnum.NOTICE_LEVEL) {
            console.log = CONSOLE_NOTICE_FN;
        }
        if (this.config.logLevel >= LoggerLevelEnum.INFO_LEVEL) {
            console.info = CONSOLE_INFO_FN;
        }
        if (this.config.logLevel >= LoggerLevelEnum.DEBUG_LEVEL) {
            console.debug = CONSOLE_DEBUG_FN || CONSOLE_INFO_FN;    // IE10 workaround
        }
    }
}

if (typeof window !== 'undefined') {
    window[GLOBAL_LOGGER_FACTORY_PARAMETER] = LoggerFactory;
}
