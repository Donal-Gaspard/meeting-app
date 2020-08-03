const CRENEAU = 24;
export const getTimeTable = (): string[] => {
  let counter = 1;
  let timeTable: string[] = [];

  for (let i = 0; i < CRENEAU; i++) {
    timeTable.push(`${i}h - ${counter}h`);
    counter++;
  }
  return timeTable;
};
