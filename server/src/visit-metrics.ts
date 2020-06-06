import fs from 'fs';
import os from 'os';

// create data dir path
const DATA_DIR_PATH = os.homedir() + '/.gamegame/data';
const VISIT_METRICS_FILE_PATH = DATA_DIR_PATH + '/visit-metrics.txt';

// full path is here
// /Users/kevindial/.gamegame/data/visit-metrics.txt

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

  async getTotalVisits() {
    return await countFileLines(VISIT_METRICS_FILE_PATH);
  }
}

/**
 * https://stackoverflow.com/a/41439945
 * performant way to count number of lines in a file
 **/
function countFileLines(filePath: string) {
  return new Promise((resolve, reject) => {
    let lineCount = 0;
    fs.createReadStream(filePath)
      .on('data', (buffer) => {
        let idx = -1;
        lineCount--; // Because the loop will run once for idx=-1
        do {
          // @ts-ignore
          idx = buffer.indexOf(10, idx + 1);
          lineCount++;
        } while (idx !== -1);
      })
      .on('end', () => {
        resolve(lineCount);
      })
      .on('error', reject);
  });
}

export default VisitMetrics;
