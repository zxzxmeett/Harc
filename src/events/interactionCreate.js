const rankCommand = require("../commands/rank");
const topCommand = require("../commands/top");

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "rank") {
      await rankCommand.execute(interaction);
    }

    if (interaction.commandName === "top") {
      await topCommand.execute(interaction);
    }
  });
};