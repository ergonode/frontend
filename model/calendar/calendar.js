/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const THIS_YEAR = +(new Date().getFullYear());

export const THIS_MONTH = +(new Date().getMonth()) + 1;

export const WEEK_DAYS = {
    Sunday: 'Sun',
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
};

export const CALENDAR_MONTHS = {
    January: 'Jan',
    February: 'Feb',
    March: 'Mar',
    April: 'Apr',
    May: 'May',
    June: 'Jun',
    July: 'Jul',
    August: 'Aug',
    September: 'Sep',
    October: 'Oct',
    November: 'Nov',
    December: 'Dec',
};

export const CALENDAR_WEEKS = 6;

// Pads a string value with leading zeroes(0) until length is reached
// For example: zeroPad(5, 2) => "05"
export const zeroPad = (value, length) => `${value}`.padStart(length, '0');

// (int) Number days in a month for a given year from 28 - 31
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
    const months30 = [4, 6, 9, 11];
    const leapYear = year % 4 === 0;

    if (month === 2) {
        return leapYear
            ? 29
            : 28;
    }

    return months30.includes(month)
        ? 30
        : 31;
};

export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => +(new Date(`${year}-${zeroPad(month, 2)}-01`).getDay()) + 1;

export const isDate = (date) => {
    const isDateObject = Object.prototype.toString.call(date) === '[object Date]';
    const isValidDate = date && !Number.isNaN(date.valueOf());

    return isDateObject && isValidDate;
};

export const isSameDay = (date, basedate = new Date()) => {
    if (!(isDate(date) && isDate(basedate))) return false;

    const basedateDate = basedate.getDate();
    const basedateMonth = +(basedate.getMonth()) + 1;
    const basedateYear = basedate.getFullYear();

    const dateDate = date.getDate();
    const dateMonth = +(date.getMonth()) + 1;
    const dateYear = date.getFullYear();

    return (+basedateDate === +dateDate)
        && (+basedateMonth === +dateMonth)
        && (+basedateYear === +dateYear);
};

export const getPreviousMonth = (month, year) => {
    const prevMonth = (month > 1) ? month - 1 : 12;
    const prevMonthYear = (month > 1) ? year : year - 1;

    return { month: prevMonth, year: prevMonthYear };
};

export const getNextMonth = (month, year) => {
    const nextMonth = (month < 12) ? month + 1 : 1;
    const nextMonthYear = (month < 12) ? year : year + 1;

    return { month: nextMonth, year: nextMonthYear };
};

export default (month = THIS_MONTH, year = THIS_YEAR) => {
    const monthDays = getMonthDays(month, year);
    const monthFirstDay = getMonthFirstDay(month, year);
    const daysFromPrevMonth = monthFirstDay - 1;
    const daysFromNextMonth = (CALENDAR_WEEKS * 7) - (daysFromPrevMonth + monthDays);
    const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
    const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);
    const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);
    const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
        const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
        return {
            year: prevMonthYear, month: prevMonth, day, disabled: true,
        };
    });
    const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
        const day = index + 1;
        return { year, month, day };
    });
    const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
        const day = index + 1;
        return {
            year: nextMonthYear, month: nextMonth, day, disabled: true,
        };
    });

    return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};
