module.exports = {
    name: 'progress',
	aliases: ["taskprogress"],
	usage: "@user (optional)",
	description: 'Show\'s the progress',
	execute(message, args) {
        // message.channel.send(args);
		message.channel.send('A lot of progress but not getting anywhere.');
	},
};