import type { AutoLoggerStartParams } from './types';
export default class AutoLogger {
    static eventsLogger: any;
    static tallyLogger: any;
    static eventsLoggerFilter: any;
    constructor();
    static start(params: AutoLoggerStartParams): Promise<void>;
}
//# sourceMappingURL=server.d.ts.map