const User = require("../models/User");
const levelRoles = require("../config/levelRoles");

async function handleXP(message) {
    if (!message.guild) return;

    const userId = message.author.id;
    const guild = message.guild; 
    const member = message.member; 

    let user = await User.findOne({ userId });

    if (!user) {
        user = new User({ userId });
    }

    user.xp += 10;
    const newLevel = Math.floor(user.xp / 100) + 1;

    if (newLevel > user.level) {
    user.level = newLevel;

    //ROLE ASSIGNMENT
    const roleId = levelRoles[newLevel];
    if (roleId) {
        const role = guild.roles.cache.get(roleId);

        if (role && member) {
            await member.roles.add(role);
        }
    }

    message.channel.send(
      `<@${user.userId}> reached level ${user.level}!`
    );
  }

    await user.save();

    console.log(`${message.author.username}:`, user);
}

module.exports = { handleXP };