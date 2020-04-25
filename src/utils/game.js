import random from "random";

export function getDiceNumber() {
  const number = random.int(1, 6);

  return number;
}
