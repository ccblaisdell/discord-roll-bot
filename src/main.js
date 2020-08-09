const Discord = require("discord.js");
const client = new Discord.Client();
const Roller = require("./roller");
const Sentry = require("@sentry/node");

Sentry.init({
  dsn:
    "https://c3f534afc81d41dbaba0965909fa4240@o428959.ingest.sentry.io/5374848",
});

const PORT = process.env.PORT || 3000;

// Keep alive on remote server
require("http")
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      "<html><style>body {display: flex; justify-content: center; align-items: center; font-family: sans-serif; background: black; color: white;}</style><div>RollBot is ready</div>"
    );
  })
  .listen(PORT, () => {
    console.log(`Rollbot running on port ${PORT}`);
  });

client.on("ready", () => console.log("Connected!"));

client.on("message", (msg) => {
  try {
    let result = Roller.handleMessage({
      allMembers: msg.channel.members,
      channels: msg.guild.channels,
      text: msg.content,
      member: msg.member,
    });
    result && msg.channel.send(result);
  } catch (error) {
    msg.channel.send("☠️ Heck! I borked, sorry!!");
  }
});

client.login(process.env.DISCORD_API_TOKEN);
