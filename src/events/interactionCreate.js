const topCommand = require("../commands/top");

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "top") {
      await topCommand.execute(interaction);
    }
  });
};