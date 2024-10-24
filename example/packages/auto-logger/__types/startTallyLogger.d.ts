/**
 * Calculates DDP stats for a given interval (DDPTallyLoggerSeconds)
 * Returns a formatted message like:
 * `unknown@127.0.0.1: (connects: 1, subs: 5, unsubs: 3) -> (links: 4, Σ: 4)`
 */
declare const startPingPongTally: ({ packageSettings, tallyLogger }: {
    packageSettings: any;
    tallyLogger: any;
}) => Promise<void>;
export default startPingPongTally;
//# sourceMappingURL=startTallyLogger.d.ts.map