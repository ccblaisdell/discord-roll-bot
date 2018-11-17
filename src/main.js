const Discord = require("discord.js");
const client = new Discord.Client();
const Roller = require("./roller");

// Keep alive on remote server
require("http")
  .createServer()
  .listen(3000);

client.on("ready", () => console.log("Connected!"));

client.on("message", msg => {
  let result = Roller.handleMessage(
    msg.content,
    msg.member,
    msg.channel.members
  );
  result && msg.channel.send(result);
});

client.login(process.env.DISCORD_API_TOKEN);
