import random from "random";

export function getDiceNumber() {
  const number = random.int(1, 5);

  return number;
}
