module.exports = {
  byValue,
  chunk,
  createRoll,
  printRoll,
  removeInvalid,
  castDie
};

function createRoll(dieSize) {
  return function(member) {
    return {
      name: member.displayName,
      status: member.presence.status,
      value: castDie(dieSize),
      isBot: member.user.bot
    };
  };
}

function castDie(dieSize = 100) {
  if (!Number.isInteger(dieSize)) {
    dieSize = 100;
  }
  return Math.ceil(Math.random() * dieSize);
}

function byValue(rollA, rollB) {
  return rollB.value - rollA.value;
}

function printRoll(roll) {
  const value = roll.value.toString().padStart(3, " ");
  const name = roll.name;
  return `${value}: ${name}`;
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
