require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const users = {};

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

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const userId = message.author.id;
    //If user not exists in the users object, create a new entry for them
    if (!users[userId]) {
    users[userId] = {
            xp: 0,
            level: 1
        };
    }
    //give XP
    users[userId].xp += 10;

    const user = users[userId];

    // check level up
    const xpNeeded = user.level * 100;
    if (user.xp >= xpNeeded) {
        user.level++;
        user.xp = user.xp - xpNeeded;

        console.log(`LEVEL UP → ${message.author.username} is now level ${user.level}`);
    }
    console.log(users[userId]);
});

client.login(process.env.TOKEN);
