
(function () {
    'use strict';

    var timezoneScrape = require('../').timezone.scraper;

    timezoneScrape(function (err, result) {
        if (err) {
            console.log('Error scraping: ' + err);
        } else {
            console.log(result.length + ' timezone records scraped!');
        }
    });

}());
