const User = require("../models/User");

module.exports = {
  name: "rank",
  async execute(message) {
    const userId = message.author.id;

    const user = await User.findOne({ userId });

    if (!user) {
      return message.channel.send("You have no XP yet.");
    }

    message.channel.send(
      `📊 ${message.author.username}\nLevel: ${user.level}\nXP: ${user.xp}`
    );
  },
};