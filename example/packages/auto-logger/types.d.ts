export interface AutoLoggerStartParams {
  /** Description */
  eventsLogger?: (eventMessage: string, event: Record<string, unknown>) => void;

  tallyLogger?: (message: string) => void;

  eventsLoggerFilter?: (params: {
    messageJSON: {
      method?: string;
      [key: string]: unknown;
    };
  }) => void;
}
