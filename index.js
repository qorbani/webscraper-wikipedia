/**
 * Export Web Scraper Module
 */

'use strict';

module.exports = {

    // Timezone Source
    timezone: {
        scraper: require('./lib/timezone/scraper'),
        exporter: require('./lib/timezone/exporter')
    },

    // Version
    version: require('./package').version

};