const Discord = require("discord.js");
const client = new Discord.Client();
const Roller = require("./roller");

// Keep alive on remote server
require("http")
  .createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<html><style>body {display: flex; justify-content: center; align-items: center; font-family: sans-serif; background: black; color: white;}</style><div>RollBot is ready</div>");
  })
  .listen(3000);

client.on("ready", () => console.log("Connected!"));

client.on("message", msg => {
  try {
    let result = Roller.handleMessage({
      allMembers: msg.channel.members,
      channels: msg.guild.channels,
      text: msg.content,
      member: msg.member
    });
    result && msg.channel.send(result);
  } catch (error) {
    msg.channel.send("☠️ Heck! I borked, sorry!!");
  }
});

client.login(process.env.DISCORD_API_TOKEN);
