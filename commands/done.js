module.exports = {
    name: 'done',
	aliases: ["donetask", "finished", "finishedtask"],
	usage: "[task name]",
	description: 'Completes the task',
	execute(message, args) {
		message.channel.send('Done... but what?');
		var user = message.author; //this stores the author's ID (Ig y'all need that... ryt?)
	},
};