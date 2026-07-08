export const formatDate = (dateValue) => {
  if (!dateValue) return '';
  return new Intl.DateTimeFormat('en-UG', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(dateValue));
};
