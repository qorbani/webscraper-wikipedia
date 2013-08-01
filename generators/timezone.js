
(function () {
    'use strict';

    var timezoneExport = require('../').timezone.exporter;

    var csvOptions = {
        delimiter: ',',
        header: true,
        quoted: false
    };

    timezoneExport.saveAsCSV('../data/timezone.csv', csvOptions, function (err, count) {
        if (err) {
            console.log('Error in generating timezone.csv: ' + err);
        } else {
            console.log(count + ' records saved in CSV file.');
        }
    });

    var jsonOptions = {
        space: 4
    };

    timezoneExport.saveAsJSON('../data/timezone.json', jsonOptions, function (err, count) {
        if (err) {
            console.log('Error in generating timezone.json: ' + err);
        } else {
            console.log(count + ' records saved in JSON file.');
        }
    });

}());
