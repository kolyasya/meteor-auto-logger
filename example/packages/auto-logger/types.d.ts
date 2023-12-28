declare module "meteor/kolyasya:auto-logger" {
  export default class AutoLogger {
    constructor(params: {
      eventsLogger?: (
        eventMessage: string,
        event: Record<string, unknown>
      ) => void;
      tallyLogger?: (message: string) => void;
      eventsLoggerFilter?: (params: {
        messageJSON: Record<string, unknown>;
      }) => voidFilter;
    });
  }
}
