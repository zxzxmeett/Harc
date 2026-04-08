const User = require("../models/User");

async function handleXP(message) {
    const userId = message.author.id;

    let user = await User.findOne({ userId });

    if (!user) {
        user = new User({ userId });
    }

    user.xp += 10;

    let leveledUp = false;

    while (user.xp >= user.level * 100) {
        user.xp -= user.level * 100;
        user.level++;
        leveledUp = true;
    }

    await user.save();

    if (leveledUp) {
        message.channel.send(
        `${message.author.username} reached level ${user.level}!`
        );
    }

    console.log(`${message.author.username}:`, user);
}

module.exports = { handleXP };