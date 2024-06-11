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
  const monthDate =
    (date.getMonth() + 1 < 9
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    '. ' +
    (date.getDate() < 9 ? '0' + date.getDate() : date.getDate());
  const time =
    (date.getHours() < 9 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 9 ? '0' + date.getMinutes() : date.getMinutes());
  return { monthDate, time };
}

export function toLocale(date: Date) {
  return new Date(date.getTime() + 1000 * 60 * 60 * 9);
}
