module.exports = {
    name: 'show',
	aliases: ["showtask", "display", "displaytask"],
	usage: "@user -a",
	description: 'Shows the tasks assigned to a user',
	execute(message, args) {
		message.channel.send('Nothing to show as of now but Awesome stuff coming soon!');
		var user = "";
		if(message.mentions.users.first()==null){
			user = message.author;
		} else {
			user = message.mentions.users.first();
		}
		// get tasks from the database
		
	},
};