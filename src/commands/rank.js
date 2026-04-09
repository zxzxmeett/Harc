const User = require("../models/User");

module.exports = {
  name: "rank",
  async execute(interaction) {
    await interaction.deferReply();

    const userId = interaction.user.id;
    const user = await User.findOne({ userId });

    if (!user) {
      return interaction.editReply("You have no XP yet.");
    }

    await interaction.editReply(
      `📊 <@${user.userId}>\nLevel: ${user.level}\nXP: ${user.xp}`
    );
  },
};