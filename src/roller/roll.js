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
  if (!channelName) {
    return "⚠️ You must include a channel name with rollchannel.\nE.g. `!rollchannel bingpot`";
  }
  const members = channels
    .filter(c => c.type === "voice")
    .filter(c => c.name.toLowerCase().includes(channelName))
    .map(c =>
      c.members.map(member => ({
        displayName: member.displayName,
        id: member.id,
        presence: { status: member.presence.status },
        user: { bot: member.user.bot }
      }))
    )
    .reduce((acc, members) => acc.concat(members), []) // flatten
    .filter(m => !!m) // remove undefined
    .reduce(dedupMembers, []);

  if (members.length === 0) {
    return `👻 No members were found in channels matching \`${channelName}\``;
  }
  return rollGroup(members, { dieSize });
}

function rollAllChannels(channels, { dieSize }) {
  const members = channels
    .filter(c => c.type === "voice")
    .filter(c => c.name.toLowerCase() !== "afk")
    .map(c =>
      c.members.map(member => ({
        displayName: member.displayName,
        id: member.id,
        presence: { status: member.presence.status },
        user: { bot: member.user.bot }
      }))
    )
    .reduce((acc, members) => acc.concat(members), []) // flatten
    .filter(m => !!m) // remove undefined
    .reduce(dedupMembers, []);

  if (members.length === 0) {
    return `👻 No members were found!`;
  }
  return rollGroup(members, { dieSize });
}

module.exports = {
  group: rollAllChannels,
  one: rollOne,
  channel: rollChannel
};

function dedupMembers(acc, member) {
  return acc.some(m => m.id === member.id) ? acc : acc.concat(member);
}
