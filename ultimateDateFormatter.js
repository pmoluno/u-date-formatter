class DateFormatter {
    constructor(locale = 'en-US', timeZone = 'UTC') {
      this.locale = locale;
      this.timeZone = timeZone;
    }
  
    static padZero(value) {
      return ('0' + value).slice(-2);
    }
  
    static getMonthName(date, locale) {
      return date.toLocaleString(locale, { month: 'long' });
    }
  
    static getDayName(date, locale) {
      return date.toLocaleString(locale, { weekday: 'long' });
    }
  
    static getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    }
  
    static getWeekNumber(date) {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }
  
    static getDayOfYear(date) {
      const start = new Date(date.getFullYear(), 0, 0);
      const diff = date - start;
      const oneDay = 1000 * 60 * 60 * 24;
      return Math.floor(diff / oneDay);
    }
  
    static getQuarter(date) {
      return Math.floor((date.getMonth() + 3) / 3);
    }
  
    static getTimezoneOffset(date) {
      const offset = date.getTimezoneOffset();
      const absOffset = Math.abs(offset);
      const hours = Math.floor(absOffset / 60);
      const minutes = absOffset % 60;
      const sign = offset <= 0 ? '+' : '-';
      return `${sign}${DateFormatter.padZero(hours)}:${DateFormatter.padZero(minutes)}`;
    }
  
    static getFullTimezoneName(date, timeZone) {
      return new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'long' }).format(date).split(', ')[1];
    }
  
    static formatRelativeTime(date) {
      const now = new Date();
      const diff = now - date;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
  
      if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  
    static formatTimeElapsed(date) {
      const now = new Date();
      const diff = now - date;
  
      const seconds = Math.floor(diff / 1000 % 60);
      const minutes = Math.floor(diff / (1000 * 60) % 60);
      const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  
    static parse(dateString, format) {
      const regexMap = {
        'dd': '(\\d{2})',
        'd': '(\\d{1,2})',
        'mm': '(\\d{2})',
        'm': '(\\d{1,2})',
        'yyyy': '(\\d{4})',
        'yy': '(\\d{2})',
        'hh': '(\\d{2})',
        'h': '(\\d{1,2})',
        'HH': '(\\d{2})',
        'H': '(\\d{1,2})',
        'MM': '(\\d{2})',
        'M': '(\\d{1,2})',
        'ss': '(\\d{2})',
        's': '(\\d{1,2})',
        'A': '(AM|PM)',
        'a': '(am|pm)',
      };
  
      let regexStr = format.replace(/dd|d|mm|m|yyyy|yy|hh|h|HH|H|MM|M|ss|s|A|a/g, match => regexMap[match]);
      const regex = new RegExp(`^${regexStr}$`);
      const matches = dateString.match(regex);
  
      if (!matches) {
        throw new Error(`Date string does not match format: ${dateString}`);
      }
  
      let dateComponents = {};
      let formatComponents = format.match(/dd|d|mm|m|yyyy|yy|hh|h|HH|H|MM|M|ss|s|A|a/g);
  
      formatComponents.forEach((component, index) => {
        dateComponents[component] = matches[index + 1];
      });
  
      let year = dateComponents['yyyy'] || ('20' + dateComponents['yy']);
      let month = (dateComponents['mm'] || dateComponents['m']) - 1;
      let day = dateComponents['dd'] || dateComponents['d'];
      let hours = dateComponents['HH'] || dateComponents['H'] || (dateComponents['hh'] || dateComponents['h'] % 12);
      if ((dateComponents['A'] || dateComponents['a']) && (dateComponents['A'] === 'PM' || dateComponents['a'] === 'pm')) {
        hours = parseInt(hours) + 12;
      }
      let minutes = dateComponents['MM'] || dateComponents['M'];
      let seconds = dateComponents['ss'] || dateComponents['s'];
  
      return new Date(year, month, day, hours, minutes, seconds);
    }
  
    format(date, format) {
      const map = {
        'dd': DateFormatter.padZero(date.getDate()),
        'd': date.getDate(),
        'do': date.getDate() + DateFormatter.getOrdinalSuffix(date.getDate()),
        'mm': DateFormatter.padZero(date.getMonth() + 1),
        'm': date.getMonth() + 1,
        'yyyy': date.getFullYear(),
        'yy': String(date.getFullYear()).slice(-2),
        'hh': DateFormatter.padZero(date.getHours() % 12 || 12),
        'h': date.getHours() % 12 || 12,
        'HH': DateFormatter.padZero(date.getHours()),
        'H': date.getHours(),
        'MM': DateFormatter.padZero(date.getMinutes()),
        'M': date.getMinutes(),
        'ss': DateFormatter.padZero(date.getSeconds()),
        's': date.getSeconds(),
        'MMMM': DateFormatter.getMonthName(date, this.locale),
        'MMM': DateFormatter.getMonthName(date, this.locale).slice(0, 3),
        'dddd': DateFormatter.getDayName(date, this.locale),
        'ddd': DateFormatter.getDayName(date, this.locale).slice(0, 3),
        'A': date.getHours() >= 12 ? 'PM' : 'AM',
        'a': date.getHours() >= 12 ? 'pm' : 'am',
        'W': DateFormatter.getWeekNumber(date),
        'ISO': date.toISOString(),
        'Qo': 'Q' + DateFormatter.getQuarter(date),
        'D': DateFormatter.getDayOfYear(date),
        'ZZ': DateFormatter.getTimezoneOffset(date),
        'Z': DateFormatter.getFullTimezoneName(date, this.timeZone),
        'X': Math.floor(date.getTime() / 1000),
        'R': DateFormatter.formatRelativeTime(date),
        'E': DateFormatter.formatTimeElapsed(date)
      };
  
      return format.replace(/dd|d|do|mm|m|yyyy|yy|hh|h|HH|H|MM|M|ss|s|MMMM|MMM|dddd|ddd|A|a|W|ISO|Qo|D|ZZ|Z|X|R|E/gi, matched => map[matched]);
    }
  }
  
  module.exports = DateFormatter;
  