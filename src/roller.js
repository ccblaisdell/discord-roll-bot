const Cmd = require("./roller/cmd_line");
const Roll = require("./roller/roll");

module.exports = { handleMessage };

function handleMessage({ allMembers, channels, member, text }) {
  let { command, opts } = Cmd.parse(text);
  if (command === "ROLL_ALL") {
    return Roll.group(channels, opts);
  } else if (command === "ROLL_CHANNEL") {
    return Roll.channel(channels, opts);
  } else if (command === "ROLL_ONE") {
    return Roll.one(member, opts);
  }
}
