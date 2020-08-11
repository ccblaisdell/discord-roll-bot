module.exports = { parse };

const PREFIX = "!";

function parse(msg) {
  if (!msg.startsWith(PREFIX + "roll")) {
    return {};
  }

  let [command, ...args] = msg.split(/\s+/);
  let dieSize = parseDieSize(args);
  let channelName = parseChannelName(args);

  // new interface will be
  // !roll -> ROLL_ALL
  // !roll <channel_name> -> ROLL_CHANNEL
  // !roll -h, !roll --help -> HELP
  // !rollme, !rollself, !roll -s, !roll --self

  if (
    command.startsWith(PREFIX + "rollm") ||
    command.startsWith(PREFIX + "rolls")
  ) {
    return { command: "ROLL_ONE", opts: { dieSize } };
  } else if (
    (command.startsWith(PREFIX + "roll") && !!channelName) ||
    command.startsWith(PREFIX + "rollch")
  ) {
    return { command: "ROLL_CHANNEL", opts: { channelName, dieSize } };
  } else if (command.startsWith(PREFIX + "roll")) {
    return { command: "ROLL_ALL", opts: { dieSize } };
  } else {
    return {};
  }

  // if (command.startsWith(PREFIX + "rollall")) {
  //   return { command: "ROLL_ALL", opts: { dieSize } };
  // } else if (command.startsWith(PREFIX + "rollch")) {
  //   return { command: "ROLL_CHANNEL", opts: { channelName, dieSize } };
  // } else if (command.startsWith(PREFIX + "roll")) {
  //   return { command: "ROLL_ONE", opts: { dieSize } };
  // } else {
  //   return {};
  // }
}

function parseDieSize(args) {
  let dieSizeArg = args.find((maybeStr) => {
    return isValidDieSize(parseInt(maybeStr));
  });
  return dieSizeArg ? parseInt(dieSizeArg) : undefined;
}

function isValidDieSize(maybeDieSize) {
  return isNaN(maybeDieSize) || !maybeDieSize || maybeDieSize <= 0
    ? false
    : true;
}

function parseChannelName(args) {
  const c = args.find((arg) => !isValidDieSize(arg));
  if (c) {
    return c.toLowerCase();
  }
}
