module.exports = { parse };

const PREFIX = "!";

function parse(msg) {
  if (!msg.startsWith(PREFIX + "roll")) {
    return {};
  }

  let [command, ...args] = msg.split(/\s+/);
  let dieSize = parseDieSize(args[0]);

  if (command.startsWith(PREFIX + "rollall")) {
    return { command: "ROLL_ALL", opts: { dieSize } };
  } else if (command.startsWith(PREFIX + "roll")) {
    return { command: "ROLL_ONE", opts: { dieSize } };
  } else {
    return {};
  }
}

function parseDieSize(maybeStr) {
  const result = parseInt(maybeStr);
  return isNaN(result) || !result || result <= 0 ? undefined : result;
}
