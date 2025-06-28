export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};
