require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

// In-memory storage (temporary)
const users = {};
const cooldown = {};

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Bot ready
client.once("clientReady", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Message event
client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const userId = message.author.id;
    const now = Date.now();

    // Cooldown (5 seconds)
    if (cooldown[userId] && now - cooldown[userId] < 5000) {
        return;
    }
    cooldown[userId] = now;

    // Initialize user if not exists
    if (!users[userId]) {
        users[userId] = {
            xp: 0,
            level: 1,
        };
    }

    // Give XP
    users[userId].xp += 10;

    const user = users[userId];

    // Handle multiple level-ups properly
    let leveledUp = false;

    while (user.xp >= user.level * 100) {
        user.xp -= user.level * 100;
        user.level++;
        leveledUp = true;
    }

    // Send message if leveled up
    if (leveledUp) {
        message.reply(`LEVEL UP → ${message.author.username} Reached level ${user.level}`);
    }

    // Debug log
    console.log(`${message.author.username}:`, user);
});

client.login(process.env.TOKEN);
