import XmasEvent from './XmasEvent.js';

class App {
  #controller;

  constructor() {
    this.#controller = new XmasEvent();
  }

  async run() {
    await this.#controller.startProcess();
  }
}

export default App;
