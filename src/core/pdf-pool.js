const puppeteer = require('puppeteer');
const genericPool = require('generic-pool');
const config = require('../config');

/**
 * Step 1 - Create pool using a factory object
 */
const factory = {
  create: async () => {
    const browser = await puppeteer.launch({
      headless: !config.DEBUG_MODE,
      ignoreHTTPSErrors: opts.ignoreHttpsErrors,
      args: ['--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox'],
      sloMo: config.DEBUG_MODE ? 250 : undefined,
    });

    return browser;
  },
  destroy(client) {
    client.disconnect();
  },
};

const opts = {
  max: 50, // maximum size of the pool
  min: 5, // minimum size of the pool
};

module.exports = genericPool.createPool(factory, opts);
