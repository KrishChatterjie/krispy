module.exports = {
	name: 'assign',
	aliases: ["give", "givetask", "assigntask"],
	usage: "@role/@user [task name]",
	description: 'Assigns task to role/user',
	execute(message, args) {
		// message.channel.send(args);
		if (message.mentions.users.first() != null) {
			message.channel.send('Assigned task to @' + message.mentions.users.first().toString());

			message.mentions.users.first().send("Hi", { split: true })
				.then(() => {
					if (message.channel.type !== "dm") {
						message.channel.send("I've sent you a DM with all commands.");
					}
				})
				.catch(() => message.reply("It seems I can't send help to you by DM."));
		}
		else{
			message.channel.send("Tell me who to assign it to, you idiot :)");
		}
	},
};