const { isOnCooldown } = require("../utils/coolDown");
const { handleXP } = require("../handlers/xpHandler");
const rankCommand = require("../commands/rank");

module.exports = (client) => {
    client.on("messageCreate", (message) => {
        if (message.author.bot) return;

        // COMMAND HANDLING
        if (message.content.startsWith("/")) {
            const command = message.content.slice(1).toLowerCase();

        if (command === "rank") {
            return rankCommand.execute(message);
        }
    }

        const userId = message.author.id;

        if (isOnCooldown(userId, 5000)) return;

        handleXP(message);
    });
};
