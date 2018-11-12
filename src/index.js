const Discord = require("discord.js");
const client = new Discord.Client();

/* TODOS
format text better
filter out bots
filter out offline
figure out deploy strategy (zeit?)
throttle so we dont get a bunch of rolls at once
*/

client.on("ready", () => {
  console.log("Connected. Don't mind me");
});

client.on("message", msg => {
  if (msg.content === "!rollall") {
    const rolls = msg.channel.members
      .map(member => ({
        displayName: member.displayName,
        status: member.presence.status,
        roll: rollDice()
      }))
      .sort(byRoll)
      .map(printRoll);

    const parties = chunk(rolls, 5)
      .map(partyRolls => partyRolls.join("\n"))
      .join("\n\n");

    const reply = `\`\`\`\n${parties}\`\`\``;
    msg.channel.send(reply);
  } else if (msg.content.startsWith("!roll")) {
    const roll = rollDice();
    const name = msg.member.displayName;
    msg.channel.send(`**${name}** rolled **${roll}**`);
  }
});

client.login(process.env.DISCORD_API_TOKEN);

const rollDice = (max = 100) => Math.ceil(Math.random() * max);

function byRoll(a, b) {
  return a.roll > b.roll ? -1 : a.roll < b.roll ? 1 : 0;
}

const printRoll = r => `${r.roll}: ${r.displayName}`;

function chunk(array, size) {
  let result = [];
  let index = 0;
  while (index < array.length) {
    result.push(array.slice(index, size + index));
    index += size;
  }
  return result;
}
