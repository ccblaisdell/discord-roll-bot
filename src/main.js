const Discord = require("discord.js");
const Roller = require("./roller");
const Sentry = require("@sentry/node");

const client = new Discord.Client({
  intents: [
    "DIRECT_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_PRESENCES",
    "GUILD_VOICE_STATES",
    "GUILDS",
    "MESSAGE_CONTENT",
  ],
});

Sentry.init({
  dsn: "https://c3f534afc81d41dbaba0965909fa4240@o428959.ingest.sentry.io/5374848",
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

client.on("messageCreate", async (msg) => {
  try {
    let result = Roller.handleMessage({
      channels: Array.from(msg.guild.channels.cache.values()),
      member: msg.member,
      text: msg.content,
    });
    result && msg.channel.send(result);
  } catch (error) {
    msg.channel.send("☠️ Heck! I borked, sorry!!");
    // rethrow so it gets reported
    throw error;
  }
});

client.login(process.env.DISCORD_API_TOKEN);
