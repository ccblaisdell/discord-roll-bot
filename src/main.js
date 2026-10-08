const Discord = require("discord.js");
const Roller = require("./roller");
const Commands = require("./roller/commands");
const Sentry = require("@sentry/node");

const client = new Discord.Client({
  // Only non-privileged intents: voice channel members arrive with voice states
  intents: ["GUILD_VOICE_STATES", "GUILDS"],
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
      "<html><style>body {display: flex; justify-content: center; align-items: center; font-family: sans-serif; background: black; color: white; flex-direction: column; gap: 1em;} a {color: #8ea1e1;}</style><div>RollBot is ready</div><a href=\"https://discord.com/oauth2/authorize?client_id=511278542969896962\">Add RollBot to your server</a>"
    );
  })
  .listen(PORT, () => {
    console.log(`Rollbot running on port ${PORT}`);
  });

client.on("ready", async () => {
  console.log("Connected!");
  await client.application.commands.set(Commands);
  console.log("Slash commands registered!");

  console.log(`In ${client.guilds.cache.size} server(s):`);
  client.guilds.cache.forEach((guild) => {
    console.log(`  ${guild.name} (${guild.id})`);
  });
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

client.login(process.env.DISCORD_API_TOKEN).catch((error) => {
  // Exit so pm2 shows the failure instead of the http server keeping us "online"
  console.error("Failed to log in to Discord:", error);
  process.exit(1);
});
