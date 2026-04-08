require("dotenv").config({ path: "../.env" });
const { Client, GatewayIntentBits } = require("discord.js");

const messageCreate = require("./events/messageCreate");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Load events
messageCreate(client);

client.login(process.env.TOKEN);