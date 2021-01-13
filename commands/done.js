module.exports = {
    name: 'done',
	aliases: ["donetask", "finished", "finishedtask"],
	usage: "[task name]",
	description: 'Completes the task',
	execute(message, args) {
        // message.channel.send(args);
		message.channel.send('Done... but what?');
	},
};