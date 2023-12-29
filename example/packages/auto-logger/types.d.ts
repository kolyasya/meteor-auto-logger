declare module "meteor/kolyasya:auto-logger" {
  export default class AutoLogger {
    static start(params: {
      eventsLogger?: (
        eventMessage: string,
        event: Record<string, unknown>
      ) => void;
      tallyLogger?: (message: string) => void;
      eventsLoggerFilter?: (params: {
        messageJSON: Record<string, unknown>;
      }) => voidFilter;
    }): Promise<void>;
  }
}
