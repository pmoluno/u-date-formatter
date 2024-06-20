#  U-Date-Formatter

![NPM Version](https://img.shields.io/npm/v/u-date-formatter)


U-Date-Formatter is a versatile Node.js module designed to format and parse dates in various formats. It supports localization, time zones, and many date formatting options.

## Installation

Install the module via npm:

```bash
npm install u-date-formatter
```
## Usage

First, require the u-date-formatter module:

```javascipt
const DateFormatter = require('u-date-formatter');
```

Create an instance of the DateFormatter class with optional locale and timeZone parameters:

```javascript
const formatter = new DateFormatter('en-US', 'America/New_York');
```

## Formatting Dates

Format dates using the format method with various tokens:

```javascript
const date = new Date();
console.log(formatter.format(date, 'dd-mm-yyyy')); // e.g., "19-06-2024"
console.log(formatter.format(date, 'mm/dd/yyyy')); // e.g., "06/19/2024"
console.log(formatter.format(date, 'yyyy-mm-dd hh:MM:ss A')); // e.g., "2024-06-19 02:45:30 PM"
console.log(formatter.format(date, 'dddd, MMMM do, yyyy')); // e.g., "Wednesday, June 19th, 2024"
console.log(formatter.format(date, 'ddd, MMM dd, yy')); // e.g., "Wed, Jun 19, 24"
console.log(formatter.format(date, 'hh:MM:ss ddd MMMM d, yyyy W')); // e.g., "02:45:30 Wed June 19, 2024 25"
console.log(formatter.format(date, 'ISO')); // e.g., "2024-06-19T14:45:30.000Z"
console.log(formatter.format(date, 'Qo')); // e.g., "Q2"
console.log(formatter.format(date, 'D')); // e.g., "171"
console.log(formatter.format(date, 'ZZ')); // e.g., "-04:00"
console.log(formatter.format(date, 'Z')); // e.g., "Eastern Daylight Time"
console.log(formatter.format(date, 'X')); // e.g., Unix timestamp
console.log(formatter.format(date, 'R')); // e.g., "2 days ago"
console.log(formatter.format(date, 'E')); // e.g., "1d 2h 45m 30s"
```

## Parsing Dates

You can parse a date string into a Date object using the parse method with a specified format:

```javascript
const dateString = '19-06-2024 02:45:30 PM';
const date = DateFormatter.parse(dateString, 'dd-mm-yyyy hh:MM:ss A');
console.log(date); // Outputs a Date object representing the parsed date
```

## Format Tokens

* `dd`: Day of the month with leading zero (01-31)
* `d`: Day of the month (1-31)
* `do`: Day of the month with ordinal suffix (1st, 2nd, 3rd, etc.)
* `mm`: Month with leading zero (01-12)
* `m`: Month (1-12)
* `yyyy`: Full year (e.g., 2024)
* `yy`: Last two digits of the year (e.g., 24)
* `hh`: Hours in 12-hour format with leading zero (01-12)
* `h`: Hours in 12-hour format (1-12)
* `HH`: Hours in 24-hour format with leading zero (00-23)
* `H`: Hours in 24-hour format (0-23)
* `MM`: Minutes with leading zero (00-59)
* `M`: Minutes (0-59)
* `ss`: Seconds with leading zero (00-59)
* `s`: Seconds (0-59)
* `MMMM`: Full month name (e.g., January, February)
* `MMM`: Abbreviated month name (e.g., Jan, Feb)
* `dddd`: Full weekday name (e.g., Monday, Tuesday)
* `ddd`: Abbreviated weekday name (e.g., Mon, Tue)
* `A`: AM/PM
* `a`: am/pm
* `W`: Week number of the year (1-52)
* `ISO`: ISO date format (e.g., 2024-06-19T14:45:30.000Z)
* `Qo`: Quarter of the year (Q1, Q2, Q3, Q4)
* `D`: Day of the year (1-365/366)
* `ZZ`: Timezone offset (e.g., +02:00)
* `Z`: Full timezone name (e.g., Eastern Daylight Time)
* `X`: Unix timestamp (e.g., 1624111530)
* `R`: Relative time (e.g., "2 days ago")
* `E`: Time elapsed since the given date (e.g., "1d 2h 45m 30s")

## Contributing

If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.
