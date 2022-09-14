export function convertMinutesAmountToHourString(minutesAmount: number) {
  const hoursString = String(Math.floor(minutesAmount / 60));
  const minutesString = String(minutesAmount % 60);
  return `${hoursString.padStart(2, "0")}:${minutesString.padStart(2, "0")}`;
}
