const Discord = require("discord.js");
const Roll = require("./roll");
const client = new Discord.Client();
const PREFIX = "!";

// Keep alive on remote server
require("http")
  .createServer()
  .listen(3000);

client.on("ready", () => {
  console.log("Connected. Don't mind me");
});

client.on("message", msg => {
  if (msg.content.startsWith(PREFIX + "rollall")) {
    const result = Roll.group(msg.channel.members);
    msg.channel.send(result);
  } else if (msg.content.startsWith(PREFIX + "roll")) {
    const result = Roll.one(msg.member);
    msg.channel.send(result);
  }
});

client.login(process.env.DISCORD_API_TOKEN);
