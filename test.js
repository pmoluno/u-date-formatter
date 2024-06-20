const DateFormatter = require('./ultimateDateFormatter');

const date = new Date();
const formatter = new DateFormatter('en-US', 'America/New_York');

console.log(formatter.format(date, 'dd-mm-yyyy')); // Expected: "19-06-2024"
console.log(formatter.format(date, 'mm/dd/yyyy')); // Expected: "06/19/2024"
console.log(formatter.format(date, 'yyyy-mm-dd hh:MM:ss A')); // Expected: "2024-06-19 02:45:30 PM"
console.log(formatter.format(date, 'dddd, MMMM do, yyyy')); // Expected: "Wednesday, June 19th, 2024"
console.log(formatter.format(date, 'ddd, MMM dd, yy')); // Expected: "Wed, Jun 19, 24"
console.log(formatter.format(date, 'hh:MM:ss ddd MMMM d, yyyy W')); // Expected: "02:45:30 Wed June 19, 2024 25"
console.log(formatter.format(date, 'ISO')); // Expected: "2024-06-19T14:45:30.000Z"
console.log(formatter.format(date, 'Qo')); // Expected: "Q2"
console.log(formatter.format(date, 'D')); // Expected: "171"
console.log(formatter.format(date, 'ZZ')); // Expected: "-04:00"
console.log(formatter.format(date, 'Z')); // Expected: "Eastern Daylight Time"
console.log(formatter.format(date, 'X')); // Expected: Unix timestamp value
console.log(formatter.format(date, 'R')); // Expected: "2 days ago"
console.log(formatter.format(date, 'E')); // Expected: "1d 2h 45m 30s"

// Test the parse function
const dateString = '19-06-2024 02:45:30 PM';
const parsedDate = DateFormatter.parse(dateString, 'dd-mm-yyyy hh:MM:ss A');
console.log(parsedDate); // Should output a Date object representing the parsed date
