import Portal from './portal.js';

export default class Portals {
  instances: Array<Portal>;

  constructor() {
    this.instances = [
      // Portal args: (x, y)

      new Portal(292, 146),
    ];
  }
}
