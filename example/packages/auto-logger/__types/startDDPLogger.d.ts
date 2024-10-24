/**
 * Logs all DDP messages except for ping/pong and messages filtered by eventsLoggerFilter
 */
declare const startDDPLogger: ({ eventsLogger, eventsLoggerFilter, }: {
    eventsLogger: any;
    eventsLoggerFilter: any;
}) => Promise<void>;
export default startDDPLogger;
//# sourceMappingURL=startDDPLogger.d.ts.map