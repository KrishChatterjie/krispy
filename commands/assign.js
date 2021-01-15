module.exports = {
	name: "assign",
	aliases: ["give", "givetask", "assigntask"],
	usage: "@role/@user [task name]",
	description: "Assigns task to role/user",
	execute(message, args) {
		

		// if role is mentioned, get a list of all users with that role from the database store it as an array
		// the elements in the array will be converted to the users object
		// if user is mentioned after that, append that user to the existing array we get from db
		// repeat the code below for all the users
		
		

		let users = message.mentions.users;

		let assignees_id = new Array();
		for (const user of users) {
			let user_copy = user.slice();
			assignees_id.push(user_copy.shift());
		}

		let taskName = "";
		let lenArgs = args.length;
		for(let i=lenArgs-1;i>=0;i--){
			let word = args[i];
			if(!word.startsWith('<')){
				taskName = word+" "+taskName;
			}
			else {
				taskName = taskName.trim();
				break;
			}
		}

		let assignerId = message.author.id;

		// console.log(assignees_id);
		// console.log("-----------------");
		// console.log(assignerId);
		// console.log("-----------------");
		// console.log(taskName);


		message.mentions.users.map(user => {

			user.send(`**Task:** ` +taskName + `\n**Assigned by:** <@` + message.author+`>`, {
				split: true,
			})
			.then(() => {
				if (message.channel.type !== "dm") {
					message.channel.send(`I\'ve assigned and sent <@` + user + `> the task.`);
				}
			})
			.catch(() => message.reply(`Something went wrong on <@` + user + `>'s end :(`));

		})

	},
};