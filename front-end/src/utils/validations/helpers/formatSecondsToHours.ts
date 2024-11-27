const formatSecondsToHours = (timeString: string): string => {
  const totalSeconds = parseInt(timeString.replace('s', ''), 10);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0'),
  ].join(':');

  return formattedTime;
};

export default formatSecondsToHours;
