const { isOnCooldown } = require("../utils/coolDown");
const { handleXP } = require("../handlers/xpHandler");

module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const userId = message.author.id;

    if (isOnCooldown(userId, 5000)) return;

    handleXP(message);
  });
};
