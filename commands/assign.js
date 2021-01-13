module.exports = {
	name: "assign",
	aliases: ["give", "givetask", "assigntask"],
	usage: "@role/@user [task name]",
	description: "Assigns task to role/user",
	execute(message, args) {
		if (message.mentions.users.first() != null) {
			message.channel.send(
				`Assigned task to <@` + message.mentions.users.first() + `>`
			);

			message.mentions.users
				.first()
				.send(args.join(" ") + `\n\nAssigned by: @` + message.author.tag, {
					split: true,
				})
				.then(() => {
					if (message.channel.type !== "dm") {
						message.channel.send(`I\'ve assigned and sent <@` + message.mentions.users.first() + `> the task.`);
					}
				})
				.catch(() => message.reply("Something is wrong :("));
		} else {
			message.channel.send("Tell me who to assign it to, you idiot :)");
		}

	},
};