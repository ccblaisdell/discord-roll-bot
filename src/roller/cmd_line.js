module.exports = { parse };

function parse(interaction) {
  const dieSize = interaction.options.getInteger("die_size") || undefined;

  if (interaction.commandName === "r") {
    const channelName = interaction.options.getString("channel");
    return channelName
      ? { command: "ROLL_CHANNEL", opts: { channelName: channelName.toLowerCase(), dieSize } }
      : { command: "ROLL_ALL", opts: { dieSize } };
  }

  if (interaction.commandName === "roll") {
    const sub = interaction.options.getSubcommand();
    if (sub === "self") {
      return { command: "ROLL_ONE", opts: { dieSize } };
    }
    if (sub === "channel") {
      const channelName = interaction.options.getString("channel");
      return { command: "ROLL_CHANNEL", opts: { channelName: channelName.toLowerCase(), dieSize } };
    }
    return { command: "ROLL_ALL", opts: { dieSize } };
  }

  return {};
}
