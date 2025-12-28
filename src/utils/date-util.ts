export function getYYYY(date: Date): string {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  return year.toString();
}

export function getMonthDDCommaYYYY(dateStringFormat: string): string {
  dateStringFormat;
  const dateObj = new Date(dateStringFormat);
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${month} ${day}, ${year}`;
}
