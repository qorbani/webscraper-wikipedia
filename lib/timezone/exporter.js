
module.exports = (function () {
    'use strict';

    // Module dependencies
    var fs = require('fs'),
        csv = require('csv'),
        scraper = require('./scraper');

    // Save As CSV
    var saveAsCSV = function (filename, options, callback) {

        // If no options passed in
        if (typeof options === 'function') { callback = options; options = {}; }

        // Check for undefined parameters
        if (typeof callback !== 'function') { callback = function () {}; }
        if (options === undefined || options.constructor !== Object) { options = {}; }

        // Set default values for options
        if (options.delimiter === undefined) { options.delimiter = ','; }
        if (options.quoted === undefined) { options.quoted = false; }
        if (options.header === undefined) { options.header = true; }

        scraper(function (err, result) {

            // Check for errors
            if (err) {
                callback(err, null);
                return;
            }

            // Generate CSV File
            var writer = csv()
                .to(filename, {
                    delimiter: options.delimiter,
                    quoted: options.quoted
                })
                .on('end', function (count) {
                    callback(null, count - 1);
                })
                .on('error', function (error) {
                    callback(error);
                });


            // Write CSV header
            if (options.header) {
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
            }

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

    // Save to JSON
    var saveAsJSON = function (filename, options, callback) {

        // If no options passed in
        if (typeof options === 'function') { callback = options; options = {}; }

        // Check for undefined parameters
        if (typeof callback !== 'function') { callback = function () {}; }
        if (options === undefined || options.constructor !== Object) { options = {}; }

        // Set default values for options
        if (options.space === undefined) { options.space = 0; }

        scraper(function (err, result) {

            // Check for errors
            if (err) {
                callback(err, null);
                return;
            }

            // Save as JSON
            fs.writeFile(
                filename,
                JSON.stringify(result, null, options.space),
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
