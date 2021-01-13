module.exports = {
    name: 'show',
	aliases: ["showtask", "display", "displaytask"],
	usage: "@user(optional) [task name]",
	description: 'Show\'s the tasks',
	execute(message, args) {
        // message.channel.send(args);
		message.channel.send('Nothing to show.');
		// get tasks from the database
		
	},
};