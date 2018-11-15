const {
  byValue,
  chunk,
  createRoll,
  printRoll,
  removeInvalid
} = require("./utils");

function rollGroup(members) {
  const rolls = members
    .map(createRoll)
    .filter(removeInvalid)
    .sort(byValue)
    .map(printRoll);

  const parties = chunk(rolls, 5)
    .map(partyRolls => partyRolls.join("\n"))
    .join("\n\n");

  return `\`\`\`\n${parties}\`\`\``;
}

function rollOne(member) {
  const { value, name } = createRoll(member);
  return `**${name}** rolled **${value}**`;
}

module.exports = {
  group: rollGroup,
  one: rollOne
};
