const Discord = require("discord.js");
const client = new Discord.Client();

const PREFIX = "!";

/* TODOS
figure out deploy strategy (zeit?)
add again with minimal permissions
*/

client.on("ready", () => {
  console.log("Connected. Don't mind me");
});

client.on("message", msg => {
  if (msg.content.startsWith(PREFIX + "rollall")) {
    const rolls = msg.channel.members
      .map(createRoll)
      .filter(removeInvalid)
      .sort(byRoll)
      .map(printRoll);

    const parties = chunk(rolls, 5)
      .map(partyRolls => partyRolls.join("\n"))
      .join("\n\n");

    const reply = `\`\`\`\n${parties}\`\`\``;
    msg.channel.send(reply);
  } else if (msg.content.startsWith(PREFIX + "roll")) {
    const { roll, name } = createRoll(msg.member);
    msg.channel.send(`**${name}** rolled **${roll}**`);
  }
});

client.login(process.env.DISCORD_API_TOKEN);

function createRoll(member) {
  return {
    name: member.displayName,
    status: member.presence.status,
    roll: rollDice(),
    isBot: member.user.bot
  };
}

const rollDice = (max = 100) => Math.ceil(Math.random() * max);

function byRoll(a, b) {
  return a.roll > b.roll ? -1 : a.roll < b.roll ? 1 : 0;
}

function printRoll(r) {
  const roll = r.roll.toString().padStart(3, " ");
  return `${roll}: ${r.name}`;
}

function chunk(array, size) {
  let result = [];
  let index = 0;
  while (index < array.length) {
    result.push(array.slice(index, size + index));
    index += size;
  }
  return result;
}

function removeInvalid(roll) {
  return noBots(roll) && onlyActive(roll);
}

function noBots(roll) {
  return !roll.isBot;
}

function onlyActive(roll) {
  return roll.status === "online" || roll.status === "idle";
}
