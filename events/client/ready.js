module.exports = async (client) => {
	console.log(`Logged in as ${client.user.tag}!`);

	let guilds = client.guilds.cache.size;
	let users = client.users.cache.size;
	let channels = client.channels.cache.size;

	const activities = [
		`${client.prefix}help | ${guilds} servers`,
		`${client.prefix}play <input> | ${users} users`,
		`${client.prefix}filterlist | ${channels} channels`,
	];

    setInterval(() => {
        client.user.setPresence({ 
            activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}`, type: 2 }], 
            status: 'online', 
        });
    }, 15000)
}
