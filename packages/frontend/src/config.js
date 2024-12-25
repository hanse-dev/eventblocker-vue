export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  defaultLocale: 'de-DE',
  dateTimeFormats: {
    date: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    },
    time: {
      hour: '2-digit',
      minute: '2-digit'
    },
    dateTime: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }
  }
};
