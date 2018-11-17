const Cmd = require("./roller/cmd_line");
const Roll = require("./roller/roll");

module.exports = { handleMessage };

function handleMessage(text, member, allMembers) {
  let { command, opts } = Cmd.parse(text);
  if (command === "ROLL_ALL") {
    return Roll.group(allMembers, opts);
  } else if (command === "ROLL_ONE") {
    return Roll.one(member, opts);
  }
}
