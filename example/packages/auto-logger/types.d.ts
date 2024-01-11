declare module 'meteor/kolyasya:auto-logger' {
  export default class AutoLogger {
    static start(params: {
      /**
       * Description
       */
      eventsLogger?: (
        eventMessage: string,
        event: Record<string, unknown>
      ) => void;
      /**
       * Description
       */
      tallyLogger?: (message: string) => void;
      /**
       * Description
       */
      eventsLoggerFilter?: (params: {
        messageJSON: Record<string, unknown>;
      }) => voidFilter;
    }): Promise<void>;
  }
}
