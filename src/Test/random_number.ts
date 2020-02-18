function random_number(min: number, max: number): number {
  let tmpMin: number = Math.ceil(min);
  let tmpMax: number = Math.floor(max);
  return Math.floor(Math.random() * (tmpMax - tmpMin + 1)) + tmpMin;
}

export {random_number};