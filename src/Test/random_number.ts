function random_number(min: number, max: number): number {
  let tmp_min: number = Math.ceil(min);
  let tmp_max: number = Math.floor(max);
  return Math.floor(Math.random() * (tmp_max - tmp_min + 1)) + tmp_min;
}

export {random_number};