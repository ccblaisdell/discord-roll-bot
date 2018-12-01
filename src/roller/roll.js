const {
  byValue,
  chunk,
  createRoll,
  printRoll,
  removeInvalid
} = require("./utils");

function rollGroup(members, { dieSize }) {
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

function rollOne(member, { dieSize }) {
  const { value, name } = createRoll(member, dieSize);
  return `**${name}** rolled **${value}**`;
}

function rollChannel(channels, { channelName, dieSize }) {
  const members = channels
    .filter(c => c.name.includes(channelName))
    .map(c => c.members)
    .reduce((acc, members) => acc.concat(members))
    .reduce(dedupMembers, []);
  return rollGroup(members, { dieSize });
}

module.exports = {
  group: rollGroup,
  one: rollOne,
  channel: rollChannel
};

function dedupMembers(acc, member) {
  return acc.some(m => m.id === member.id) ? acc : acc.concat(member);
}
