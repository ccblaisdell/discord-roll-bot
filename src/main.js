const Discord = require("discord.js");
const client = new Discord.Client();
const Roller = require("./roller");

// Keep alive on remote server
require("http")
  .createServer()
  .listen(3000);

client.on("ready", () => console.log("Connected!"));

client.on("message", msg => {
  let result = Roller.handleMessage({
    allMembers: msg.channel.members,
    channels: msg.guild.channels,
    content: msg.content,
    member: msg.member
  });
  result && msg.channel.send(result);
});

client.login(process.env.DISCORD_API_TOKEN);
