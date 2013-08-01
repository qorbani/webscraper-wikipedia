/*jslint continue:true*/

module.exports = function (callback) {
    'use strict';

    var webscraper = require('webscraper');

    var helpers = {
        htmlDecode: function (text) {
            return text.replace('&amp;', '&');
        },
        getOffset: function (offset) {
            // Prepare result
            var result = {};
            result.Offset = offset;
            result.OffsetMinutes =
                parseInt(offset.slice(1, 3), 10) * 60 +
                parseInt(offset.slice(4, 6), 10);

            // Wikipedia is not using standard '-' for time offset
            if (offset.slice(0, 1) !== '+') {
                result.Offset = '-' + offset.slice(1, 6);
                result.OffsetMinutes  *= -1;
            }
            return result;
        }
    };

    webscraper('http://en.wikipedia.org/wiki/List_of_tz_database_time_zones', function (err, $) {

        // Check for errors
        if (err) {
            callback(new Error('Unable to scrape Wikipedia page!'), null);
            return;
        }

        // Read TimeZone table
        var rows = $('.wikitable:first-of-type tr');

        // Validate result before parsing
        if (rows.length === 0) {
            callback(new Error('Unable to find any data!'), null);
            return;
        }

        // Prepare result list
        var list = [];

        // Start parsing result
        var idx, i;
        for (idx = 0; idx < rows.length; idx = idx + 1) {
            // Bypass first column
            if (idx === 0) { continue; }

            // Get fields data
            var fields = $(rows[idx]).find('td');

            // Validate fields
            if (fields.length !== 7) {
                callback(new Error('Invalid fields count for record #' + idx), null);
                return;
            }

            // Parse field data
            var tz = {};

            try {
                // Country Code
                if (fields[0].children.length > 0) {
                    tz.CountryCodeISO = fields[0].children[0].attribs.title;
                    tz.CountryCodeISOWiki = fields[0].children[0].attribs.href;
                    tz.CountryCode = fields[0].children[0].children[0].data;
                }

                // TimeZone Name
                tz.Name = fields[2].children[0].children[0].data;

                // UTC Offset
                var tmpOffsetUTC = helpers.getOffset(fields[4].children[0].children[0].data);
                var tmpOffsetUTCDST = helpers.getOffset(fields[5].children[0].children[0].data);
                tz.OffsetUTC = tmpOffsetUTC.Offset;
                tz.OffsetUTCDST = tmpOffsetUTCDST.Offset;
                tz.OffsetUTCMinutes = tmpOffsetUTC.OffsetMinutes;
                tz.OffsetUTCDSTMinutes = tmpOffsetUTCDST.OffsetMinutes;

                // Coordinates
                if (fields[1].children.length > 0) {
                    tz.Coordinate = fields[1].children[0].data;
                }

                // Comments
                if (fields[3].children.length > 0) {
                    tz.Comments = helpers.htmlDecode(fields[3].children[0].data);
                }

                // Notes and Links
                if (fields[6].children.length > 0) {

                    // Compose note from child elements
                    tz.Note = '';
                    for (i = 0; i < fields[6].children.length; i = i + 1) {
                        tz.Note += fields[6].children[i].children ? fields[6].children[i].children[0].data : fields[6].children[i].data;
                    }

                    // Detect Links to other TimeZone
                    if (fields[6].children[0].data === "Link to ") {
                        tz.Link = fields[6].children[1].children[0].data;
                    }
                }

                // Save result in list
                list.push(tz);
            } catch (e) {
                callback(new Error('Unable to parse record #' + idx + ' - ' + e), null);
                return;
            }
        }

        // Return result
        callback(null, list);
    });
};

/**
 * Thanks to:
 *
 * Adam Tuttle for his node-tz-db project
 * https://github.com/atuttle/node-tz-db
 */

