const {
  byValue,
  chunk,
  createRoll,
  createRollMember,
  dedupMembers,
  getChannelMembers,
  isVoiceChannel,
  printRoll,
  removeInvalid,
} = require("./utils");

function rollGroup(members, { dieSize }) {
  const rolls = members.map((member) => createRoll(member, dieSize));
  const rollStrings = rolls.filter(removeInvalid).sort(byValue).map(printRoll);

  const parties = chunk(rollStrings, 5)
    .map((partyRolls) => partyRolls.join("\n"))
    .join("\n\n");

  return `\`\`\`\n${parties}\n\`\`\``;
}

function rollOne(guildMember, { dieSize }) {
  const { value, name } = createRoll(guildMember, dieSize);
  return `**${name}** rolled **${value}**`;
}

function rollChannel(channels, { channelName, dieSize }) {
  if (!channelName) {
    return "⚠️ You must include a channel name with rollchannel.\nE.g. `!rollchannel bingpot`";
  }
  const members = channels
    .filter(isVoiceChannel)
    .filter((channel) => channel.name.toLowerCase().includes(channelName))
    .map((channel) => getChannelMembers(channel).map(createRollMember))
    .flat()
    .filter((rollMember) => !!rollMember) // remove undefined
    .reduce(dedupMembers, []);

  if (members.length === 0) {
    return `👻 No members were found in channels matching \`${channelName}\``;
  }
  return rollGroup(members, { dieSize });
}

function rollAllChannels(channels, { dieSize }) {
  const members = channels
    .filter(isVoiceChannel)
    .map((channel) => {
      console.log(channel.name);
      return channel;
    })
    .filter((channel) => channel.name.toLowerCase() !== "afk")
    .map((channel) => getChannelMembers(channel).map(createRollMember))
    .flat()
    .filter((member) => !!member) // remove undefined
    .reduce(dedupMembers, []);

  if (members.length === 0) {
    return `👻 No members were found!`;
  }
  return rollGroup(members, { dieSize });
}

module.exports = {
  group: rollAllChannels,
  one: rollOne,
  channel: rollChannel,
};
