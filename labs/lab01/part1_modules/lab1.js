const _ = require('lodash');

const holidays = [
  { name: 'Christmas', date: '2025-12-25' },
  { name: 'Canada Day', date: '2025-07-01' },
  { name: 'New Years', date: '2026-01-01' },
  { name: 'Lab Day', date: '2025-05-15' }  
];

function daysUntil(dateStr) {
  const today = new Date();
  const then = new Date(dateStr);
  const diffMs = then - today;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

holidays.forEach(holiday => {
  const days = daysUntil(holiday.date);
  console.log(`${holiday.name} is in ${days} day(s)`);
});


const randomHoliday = _.sample(holidays);
console.log(`Random holiday: ${randomHoliday.name} on ${randomHoliday.date}`);

const idxChristmas = _.findIndex(holidays, { name: 'Christmas' });
const idxCanadaDay = _.findIndex(holidays, { name: 'Canada Day' });
console.log(`Index of Christmas: ${idxChristmas}`);
console.log(`Index of Canada Day: ${idxCanadaDay}`);