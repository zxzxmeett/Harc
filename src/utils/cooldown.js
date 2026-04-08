const cooldown = {};

function isOnCooldown(userId, duration) {
    const now = Date.now();

    if (cooldown[userId] && now - cooldown[userId] < duration) {
        return true;
    }

    cooldown[userId] = now;
    return false;
}

module.exports = { isOnCooldown };