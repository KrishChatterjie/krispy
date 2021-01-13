module.exports = {
	name: 'assign',
	description: 'Assigns task to role/user',
	execute(message, args) {
        // message.channel.send(args);
		if (message.mentions.roles.size){
			const Role = message.mentions.roles.first();
			let arr = new Array();
			Role.members.forEach(user => {
				arr.push(user.user.username);
			});

			message.channel.send(arr.join(' | '));
        }
		if (message.mentions.users.size){
            console.log(message.mentions.users.first());
        }
	},
};