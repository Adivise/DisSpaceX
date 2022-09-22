module.exports = async (client, oldState, newState) => {
	const queue = client.distube.getQueue(newState.guild.id);
	if (!queue) return;
	if (!newState.guild.members.cache.get(client.user.id).voice.channelId) return client.UpdateMusic(queue);
}