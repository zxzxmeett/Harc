const User = require("../models/User");

module.exports = {
  name: "rank",
  async execute(interaction) {
    const userId = interaction.user.id;
    const user = await User.findOne({ userId });

    if (!user) {
      return interaction.reply("You have no XP yet.");
    }

    interaction.reply(
      `📊 <@${user.userId}>\nLevel: ${user.level}\nXP: ${user.xp}`,
    );
  },
};