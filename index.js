const { ShardingManager } = require("discord.js");
const { token } = require("./config.json");

const manager = new ShardingManager('./disspacex.js', {
    token: token,
    totalShards: 'auto',
    shardList: 'auto',
    mode: 'process',
    respawn: 'true',
    timeout: 999999,
});

manager.spawn()