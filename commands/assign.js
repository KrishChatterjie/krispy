module.exports = {
	name: 'assign',
	description: 'Assigns task to role/user',
	execute(message, args) {
		message.channel.send('Task assigned!');
	},
};