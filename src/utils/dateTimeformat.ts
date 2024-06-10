export function formatter(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatter2(date: Date) {
  const newDate = toLocale(date);
  const monthDate =
    (newDate.getMonth() + 1 < 9
      ? '0' + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1) +
    '. ' +
    (newDate.getDate() < 9 ? '0' + newDate.getDate() : newDate.getDate());
  const time =
    (newDate.getHours() < 9 ? '0' + newDate.getHours() : newDate.getHours()) +
    ':' +
    (newDate.getMinutes() < 9
      ? '0' + newDate.getMinutes()
      : newDate.getMinutes());
  return { monthDate, time };
}

export function toLocale(date: Date) {
  return new Date(date.getTime() + 1000 * 60 * 60 * 9);
}
