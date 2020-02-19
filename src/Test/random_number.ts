function makeRandomNumber(min: number, max: number): number {
  const tmpMin: number = Math.ceil(min);
  const tmpMax: number = Math.floor(max);
  return Math.floor(Math.random() * (tmpMax - tmpMin + 1)) + tmpMin;
}

export { makeRandomNumber };
