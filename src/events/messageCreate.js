const { isOnCooldown } = require("../utils/cooldown");
const { handleXP } = require("../handlers/xpHandler");

module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    const userId = message.author.id;
    if (isOnCooldown(userId, 10000)) return; // 10 second cooldown

    handleXP(message);
  });
};