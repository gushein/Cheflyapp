const toDate = (value: string | Date): Date => (value instanceof Date ? value : new Date(value));

export function formatDate(date: string | Date): string {
  return toDate(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatTime(time: string | Date): string {
  if (time instanceof Date) {
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function isToday(date: string | Date): boolean {
  const today = new Date();
  const checkDate = toDate(date);
  return today.toDateString() === checkDate.toDateString();
}

export function isFutureDate(date: string | Date): boolean {
  const today = new Date();
  const checkDate = toDate(date);
  return checkDate > today;
}
