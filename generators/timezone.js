
(function () {
    'use strict';

    var timezoneExport = require('../').timezone.exporter;

    timezoneExport.saveAsCSV('../data/timezone.csv', function (err, count) {
        if (err) {
            console.log('Error in generating timezone.csv: ' + err);
        } else {
            console.log(count + ' records saved in CSV file.');
        }
    });

    timezoneExport.saveAsJSON('../data/timezone.json', function (err, count) {
        if (err) {
            console.log('Error in generating timezone.json: ' + err);
        } else {
            console.log(count + ' records saved in JSON file.');
        }
    });

}());
