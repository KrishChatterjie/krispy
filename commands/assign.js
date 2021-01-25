const axios = require('axios');

// const promise = axios.get('http://localhost:3001/notes')

//READ
// promise.then(response => {
//   console.log(response)
// })

// axios
//     .post('http://localhost:3001/notes', noteObject)
//     .then(response => {
//       console.log(response)
//     })

module.exports = {
	name: 'assign',
	aliases: ['give', 'givetask', 'assigntask'],
	usage: '@user [task name]',
	description: 'Assigns task to user',
	execute(message, args) {
		// if role is mentioned, get a list of all users with that role from the database store it as an array
		// the elements in the array will be converted to the users object
		// if user is mentioned after that, append that user to the existing array we get from db
		// repeat the code below for all the users

		const users = message.mentions.users
		const guild_id = message.guild.id;
		const assignees_id = new Array()
		for (const user of users) {
			const user_copy = user.slice()
			assignees_id.push(user_copy.shift())
		}

		// working
		// const roles = message.mentions.roles
		// async function asyncFunction () {
		//   for (const role of roles) {
		//     const x = await getInfo.getUsers(message.guild, role)
		//     message.channel.send(x)
		//   }
		// }
		//

		let taskName = ''
		const lenArgs = args.length
		for (let i = lenArgs - 1; i >= 0; i--) {
			const word = args[i]
			if (!word.startsWith('<')) {
				taskName = word + ' ' + taskName
			} else {
				taskName = taskName.trim()
				break
			}
		}

		const assignerId = message.author.id

		// console.log(assignees_id);
		// console.log("-----------------");
		// console.log(assignerId);
		// console.log("-----------------");
		// console.log(taskName);



		message.mentions.users.map(user => {
			user.send('**Task:** ' + taskName + '\n**Assigned by:** <@' + message.author + '>', {
					split: true
				})
				.then(() => {
					if (message.channel.type !== 'dm') {
						message.channel.send('I\'ve assigned and sent <@' + user + '> the task.')
					}
				})
				.catch(() => message.reply('Something went wrong on <@' + user + '>\'s end :('))
		})

		axios.get(`http://localhost:3001/servers/${guild_id}`).then((response) => {
			currentState = response.data;

			console.log(currentState);

			// axios.post("http://localhost:3001/servers/", newObject);
		})

	}
}