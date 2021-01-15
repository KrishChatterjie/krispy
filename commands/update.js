module.exports = {
	name: 'update',
	description: 'Updates the server details.',
	aliases: ["refresh"],
    usage: "",
	execute(message, args) {
		message.channel.send('Updated.... maybe..?');
	},
};