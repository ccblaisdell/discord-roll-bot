const {
  byValue,
  chunk,
  createRoll,
  printRoll,
  removeInvalid
} = require("./utils");

function rollGroup(members, dieSize) {
  const rolls = members.map(member => createRoll(member, dieSize));
  const rollStrings = rolls
    .filter(removeInvalid)
    .sort(byValue)
    .map(printRoll);

  const parties = chunk(rollStrings, 5)
    .map(partyRolls => partyRolls.join("\n"))
    .join("\n\n");

  return `\`\`\`\n${parties}\n\`\`\``;
}

function rollOne(member, dieSize) {
  const { value, name } = createRoll(member, dieSize);
  return `**${name}** rolled **${value}**`;
}

module.exports = {
  group: rollGroup,
  one: rollOne
};
