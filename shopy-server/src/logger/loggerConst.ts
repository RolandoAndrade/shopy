import { ILogger } from "./ILogger";
import { LoggerConsoleStrategy } from "./strategies/loggerConsole.strategy";

export const logger: ILogger = new LoggerConsoleStrategy();