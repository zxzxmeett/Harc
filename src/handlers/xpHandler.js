const users = require("../data/users");

function handleXP(message) {
    const userId = message.author.id;

    if (!users[userId]) {
        users[userId] = {
        xp: 0,
        level: 1,
        };
    }

    users[userId].xp += 10;

    const user = users[userId];
        let leveledUp = false;

    while (user.xp >= user.level * 100) {
        user.xp -= user.level * 100;
        user.level++;
        leveledUp = true;
    }

    if (leveledUp) {
     message.channel.send(
        `${message.author.username} reached level ${user.level} W!`
        );
    }

    console.log(`${message.author.username}:`, user);
}

module.exports = { handleXP };