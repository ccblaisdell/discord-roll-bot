const Cmd = require("../argParser");
const Roll = require("../roll");

module.exports = { handleMessage };

function handleMessage(text, member, allMembers, sendFn) {
  let { command, args } = Cmd.parse(text);
  if (command === "ROLL_ALL") {
    const result = Roll.group(allMembers, ...args);
    sendFn(result);
    return result;
  } else if (command === "ROLL_ONE") {
    const result = Roll.one(member, ...args);
    sendFn(result);
    return result;
  }
  return { command, args };
}
