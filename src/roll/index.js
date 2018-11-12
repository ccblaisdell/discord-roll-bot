const {
  createRoll,
  removeInvalid,
  byRoll,
  printRoll,
  chunk
} = require("./utils");

function rollGroup(members) {
  const rolls = members
    .map(createRoll)
    .filter(removeInvalid)
    .sort(byRoll)
    .map(printRoll);

  const parties = chunk(rolls, 5)
    .map(partyRolls => partyRolls.join("\n"))
    .join("\n\n");

  return `\`\`\`\n${parties}\`\`\``;
}

function rollOne(member) {
  const { roll, name } = createRoll(member);
  return `**${name}** rolled **${roll}**`;
}

module.exports = {
  group: rollGroup,
  one: rollOne
};
