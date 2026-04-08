const User = require("../models/User");

module.exports = {
  name: "top",

  async execute(message) {
    const users = await User.find()
      .sort({ xp: -1 })
      .limit(10);

    if (!users.length) {
      return message.channel.send("No data yet.");
    }

    let leaderboard = "🏆 Leaderboard\n\n";

    users.forEach((user, index) => {
      leaderboard += `${index + 1}. <@${user.userId}> — Level ${user.level} (${user.xp} XP)\n`;
    });

    message.channel.send(leaderboard);
  },
};