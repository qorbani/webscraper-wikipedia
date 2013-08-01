# Web Scraper for Wikipedia Pages

Collect following data sources from Wikipedia:

- timezone
	- Source: [List of tz database time zones](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
	- Actual Fields:
		- CountryCode
		- Coordinates 	
		- TimeZone
		- Comments
		- UTC offset
		- UTC DST offset
		- Notes
	- Extended Fields:
		- CountryCodeISO
		- CountryCodeISOWiki
		- Link
		- OffsetUTCMinutes
		- OffsetUTCDSTMinutes

Module provide following sections for each data source:

- `scraper`: Scraper is responsible to parse source page from Wikipedia and provide result in callback.
- `exporter`: Exporter will use scraper to collect data and expose different export types such as JSON or CSV.

## Installation

Install using [npm](http://github.com/isaacs/npm):

    $ npm install webscraper-wikipedia

## Usage

Please refer to `./examples/*.js` for `scraper` samples and `./generators/*.js` for `exporter` samples.

## Data

Generated data are located in `./data/` folder. To refresh data use generators located in `./generators/` folder. For instance to refresh data for timezone database use following command:

	$ cd ./generators/ ; node timezone.js

## To do list
---

Enhance following sources:

- timezone
    - Convert Coordinates from ISO 6709 to Longitude and Latitude
    - Fill missed fields based on linked Timezones

Add new sources:

- countries - List of countries in ISO 3166-1
