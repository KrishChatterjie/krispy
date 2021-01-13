module.exports = {
	name: 'assign',
	aliases: ["give", "givetask", "assigntask"],
	usage: "@role/@user [task name]",
	description: 'Assigns task to role/user',
	execute(message, args) {
        // message.channel.send(args);
		message.channel.send('Assigned task.');
	},
};