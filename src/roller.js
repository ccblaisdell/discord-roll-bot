const Cmd = require("./roller/cmd_line");
const Roll = require("./roller/roll");

module.exports = { handleMessage };

function handleMessage(text, member, allMembers, sendFn) {
  let { command, opts } = Cmd.parse(text);
  if (command === "ROLL_ALL") {
    const result = Roll.group(allMembers, opts);
    sendFn(result);
    return result;
  } else if (command === "ROLL_ONE") {
    const result = Roll.one(member, opts);
    sendFn(result);
    return result;
  }
  return { command, opts };
}
