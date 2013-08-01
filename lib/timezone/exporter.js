
module.exports = (function () {
    'use strict';

    // Module dependencies
    var fs = require('fs'),
        csv = require('csv'),
        scraper = require('./scraper');

    // Save As CSV
    var saveAsCSV = function (filename, callback) {
        scraper(function (err, result) {

            // Check for errors
            if (err) {
                callback(err, null);
                return;
            }

            // Generate CSV File
            var writer = csv()
                .to(filename)
                .on('end', function (count) {
                    callback(null, count - 1);
                })
                .on('error', function (error) {
                    callback(error);
                });


            // Write CSV header
            writer.write([
                // Default fields
                'CountryCode',
                'Coordinates',
                'Name',
                'Comments',
                'OffsetUTC',
                'OffsetUTCDST',
                'Notes',
                // Extended fields
                'CountryCodeISO',
                'CountryCodeISOWiki',
                'Link',
                'OffsetUTCMinutes',
                'OffsetUTCDSTMinutes'
            ]);

            // Write data to CSV
            var i;
            for (i = 0; i < result.length; i = i + 1) {
                writer.write([
                    // Default fields
                    result[i].CountryCode,
                    result[i].Coordinate,
                    result[i].Name,
                    result[i].Comments,
                    result[i].OffsetUTC,
                    result[i].OffsetUTCDST,
                    result[i].Note,
                    // Extended fields
                    result[i].CountryCodeISO,
                    result[i].CountryCodeISOWiki,
                    result[i].Link,
                    result[i].OffsetUTCMinutes,
                    result[i].OffsetUTCDSTMinutes
                ]);
            }

            // Finish writing
            writer.end();
        });
    };

    var saveAsJSON = function (filename, callback) {
        scraper(function (err, result) {

            // Check for errors
            if (err) {
                callback(err, null);
                return;
            }

            // Save as JSON
            fs.writeFile(
                filename,
                JSON.stringify(result, null, 4),
                function (err) {

                    // Check for errors
                    if (err) {
                        callback(err, null);
                        return;
                    }

                    callback(null, result.length);
                }
            );
        });
    };

    return {
        saveAsCSV: saveAsCSV,
        saveAsJSON: saveAsJSON
    };
}());
