module.exports = {
	name: 'remove',
	description: 'Removes a task.',
	aliases: ["delete"],
    usage: "@role/@user [task name]",
	execute(message, args) {
		message.channel.send('Imma delete YOU!');
	},
};