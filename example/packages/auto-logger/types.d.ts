export interface AutoLoggerStartParams {
  /** Logs all DDP messages except for ping/pong and messages filtered by eventsLoggerFilter */
  eventsLogger?: (eventMessage: string, event: Record<string, unknown>) => void;

  /**
   * Calculates DDP stats for a given interval (DDPTallyLoggerSeconds)
   *
   * Returns a formatted message like:
   *
   * `unknown@127.0.0.1: (connects: 1, subs: 5, unsubs: 3) -> (links: 4, Σ: 4)`
   */
  tallyLogger?: (message: string) => void;

  /**
   * Filter to skip some messages from being logged by eventsLogger
   */
  eventsLoggerFilter?: (params: {
    messageJSON: {
      method?: string;
      [key: string]: unknown;
    };
  }) => boolean;
}
