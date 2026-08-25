const Discord = require("discord.js");
const Roller = require("./roller");
const Commands = require("./roller/commands");
const Sentry = require("@sentry/node");

const client = new Discord.Client({
  intents: [
    "GUILD_MEMBERS",
    "GUILD_PRESENCES",
    "GUILD_VOICE_STATES",
    "GUILDS",
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

client.on("ready", async () => {
  console.log("Connected!");
  await client.application.commands.set(Commands);
  console.log("Slash commands registered!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  try {
    let result = Roller.handleInteraction(interaction, {
      channels: Array.from(interaction.guild.channels.cache.values()),
      member: interaction.member,
    });
    await interaction.reply(result || "🤷 Not sure what to roll for that.");
  } catch (error) {
    await interaction
      .reply("☠️ Heck! I borked, sorry!!")
      .catch(() => {});
    // rethrow so it gets reported
    throw error;
  }
});

client.login(process.env.DISCORD_API_TOKEN);
