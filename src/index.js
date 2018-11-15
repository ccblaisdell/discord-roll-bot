const Discord = require("discord.js");
const Cmd = require("./argParser");
const Roll = require("./roll");
const client = new Discord.Client();

// Keep alive on remote server
require("http")
  .createServer()
  .listen(3000);

client.on("ready", () => {
  console.log("Connected. Don't mind me");
});

client.on("message", msg => {
  let { command, args } = Cmd.parse(msg.content);
  if (command === "ROLL_ALL") {
    const result = Roll.group(msg.channel.members, ...args);
    msg.channel.send(result);
  } else if (command === "ROLL") {
    const result = Roll.one(msg.member, ...args);
    msg.channel.send(result);
  }
});

client.login(process.env.DISCORD_API_TOKEN);
