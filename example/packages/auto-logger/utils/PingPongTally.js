let instance;
let pingPongTally = {};

// Singleton
class PingPongTally {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!');
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  get() {
    return pingPongTally;
  }

  reset() {
    pingPongTally = {};
  }

  getItem(key) {
    return pingPongTally[key];
  }

  setItem(key, value) {
    pingPongTally[key] = value;
  }
}

const PingPongTallySingleton = Object.freeze(new PingPongTally());
export default PingPongTallySingleton;
