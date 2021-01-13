module.exports = {
	name: 'ping',
	description: 'Checks if the bot is online.',
	aliases: ["check", "online","checkonline"],
    usage: "",
	execute(message, args) {
		message.channel.send('Pong! I\'m here!!');
	},
};