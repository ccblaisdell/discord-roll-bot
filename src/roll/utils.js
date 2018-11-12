module.exports = {
  createRoll,
  removeInvalid,
  byRoll,
  printRoll,
  chunk
};

function createRoll(member) {
  return {
    name: member.displayName,
    status: member.presence.status,
    roll: rollDice(),
    isBot: member.user.bot
  };
}

const rollDice = (max = 100) => Math.ceil(Math.random() * max);

function byRoll(a, b) {
  return a.roll > b.roll ? -1 : a.roll < b.roll ? 1 : 0;
}

function printRoll(r) {
  const roll = r.roll.toString().padStart(3, " ");
  return `${roll}: ${r.name}`;
}

function chunk(array, size) {
  let result = [];
  let index = 0;
  while (index < array.length) {
    result.push(array.slice(index, size + index));
    index += size;
  }
  return result;
}

function removeInvalid(roll) {
  return noBots(roll) && onlyActive(roll);
}

function noBots(roll) {
  return !roll.isBot;
}

function onlyActive(roll) {
  return roll.status === "online" || roll.status === "idle";
}
