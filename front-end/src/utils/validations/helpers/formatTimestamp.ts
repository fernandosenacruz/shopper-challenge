const formatTimestamp = (timestamp: string | number | Date): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(date);
};

export default formatTimestamp;
