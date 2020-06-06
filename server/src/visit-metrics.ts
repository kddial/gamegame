import fs from 'fs';
import os from 'os';

// create data dir path
const DATA_DIR_PATH = os.homedir() + '/.gamegame/data';
const VISIT_METRICS_FILE_PATH = DATA_DIR_PATH + '/visit-metrics.txt';

class VisitMetrics {
  constructor() {
    // make folder if it does not exist
    fs.mkdirSync(DATA_DIR_PATH, { recursive: true });
  }

  addNewVisitDataPoint() {
    const nowTimestamp = `${new Date().valueOf()}\n`;
    fs.appendFile(VISIT_METRICS_FILE_PATH, nowTimestamp, (err) => {
      if (err) throw err;
    });
  }
}

export default VisitMetrics;
