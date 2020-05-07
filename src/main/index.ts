import Application from "./application";

// eslint-disable-next-line
const v8 = require("v8");

const totalHeapSize = v8.getHeapStatistics().total_available_size;
const totalHeapSizeInGB = (totalHeapSize / 1024 / 1024 / 1024).toFixed(2);

console.log(
  `main-process: Total heap size (bytes) ${totalHeapSize}, (GB ~${totalHeapSizeInGB})`
);

(async function bootstrap(): Promise<void> {
  try {
    const app = new Application(process.env.NODE_ENV !== "production");
    await app.setup();
    await app.start();
  } catch (error) {
    console.error(`main-process: an error occurred: ${error}\n${error.stack}`);
  }
})();
