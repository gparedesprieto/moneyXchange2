import {ILoggerCallback} from './ILoggerCallback';

export type LoggerPayload = Object | ILoggerCallback;

export interface ILogger {

    setLoggedClass(loggedClass:Function):ILogger;

    debug(...payloads:LoggerPayload[]);

    info(...payloads:LoggerPayload[]);

    log(...payloads:LoggerPayload[]);

    warn(...payloads:LoggerPayload[]);

    error(...payloads:LoggerPayload[]);
    
    isDebugEnabled():boolean;

    isInfoEnabled():boolean;

    isLogEnabled():boolean;

    isWarnEnabled():boolean;

    isErrorEnabled():boolean;
}
