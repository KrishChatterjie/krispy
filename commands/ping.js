module.exports = {
	name: 'ping',
	description: 'Checks if the bot id online.',
	execute(message, args) {
        // message.channel.send(args);
		message.channel.send('Pong');
	},
};