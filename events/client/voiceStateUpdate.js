const { VoiceState } = require("discord.js");

/**
 * 
 * @param {VoiceState} oldState 
 * @param {VoiceState} newState 
 * @param {Promise<void>}
 * @returns
 */

module.exports = async (client, oldState, newState) => {

  let guildId = newState.guild.id;
  const queue = client.distube.getQueue(guildId);

  const stateChange = {};

  if (oldState.channel === null && newState.channel !== null)
    stateChange.type = "JOIN";
  if (oldState.channel !== null && newState.channel === null)
    stateChange.type = "LEAVE";
  if (oldState.channel !== null && newState.channel !== null)
    stateChange.type = "MOVE";
  if (oldState.channel === null && newState.channel === null) return;
  if (newState.serverMute == true && oldState.serverMute == false)
    return client.distube.pause(guildId);
  if (newState.serverMute == false && oldState.serverMute == true)
    return client.distube.resume(guildId);

  if (stateChange.type === "JOIN") stateChange.channel = newState.channel;
  if (stateChange.type === "LEAVE") stateChange.channel = oldState.channel;

  stateChange.members = stateChange.channel.members.filter(
    (member) => !member.user.bot
  );

  switch (stateChange.type) {
    case "JOIN":
      if (stateChange.members.size === 1 && queue.paused) {
        client.distube.resume(guildId);
      }
      break;
    case "LEAVE":
      if (stateChange.members.size === 0 && !queue.paused && queue.playing) {
        client.distube.pause(guildId);
      }
      break;
  }
};