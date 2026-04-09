require("dotenv").config({ path: "../.env" });

const connectDB = require("./config/database");
const { Client, GatewayIntentBits } = require("discord.js");
const messageCreate = require("./events/messageCreate");
const interactionCreate = require("./events/interactionCreate");
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
interactionCreate(client);
connectDB();
client.login(process.env.TOKEN);