export function getYYYY(date: Date): string {
  if (date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    return year.toString();
  }
  return '';
}

export function getMonthDDCommaYYYY(dateStringFormat: string): string {
  if (dateStringFormat) {
    const dateObj = new Date(dateStringFormat);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  return '';
}
