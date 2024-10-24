import type { AutoLoggerStartParams, AutoLoggerSettings } from './types';
export default class AutoLogger {
    static eventsLogger: any;
    static tallyLogger: any;
    static eventsLoggerFilter: any;
    constructor();
    static getPackageSettings(settings?: AutoLoggerSettings): any;
    static start(params: AutoLoggerStartParams, settings?: AutoLoggerSettings): Promise<void>;
}
//# sourceMappingURL=server.d.ts.map