//json-server --port 3001 --watch db.json
const dotenv = require('dotenv')

dotenv.config();
const getInfo = require('./getrolesusers')

const axios = require('axios');

const fs = require('fs')
const Discord = require('discord.js')

const {
	prefix
} = require('./config.json')

const client = new Discord.Client()
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

// On adding to a new server
client.on('guildCreate', guild => {
	console.log(guild.id)
	console.log(guild.name)
	// add server to json  
  axios.get('http://localhost:3001/servers').then((response) => {
    currentState = response.data;
    if (currentState.map(server => server.id).includes(guild.id)) {
      pass;
    } else {
      newObject = {
        id: guild.id,
        users: [
  
        ]
      }
      axios.post("http://localhost:3001/servers/", newObject);
    }
  })
})

// On adding new member
client.on('guildMemberAdd', (message, member) => {
	message.channel.send('Welcome')
})

// On message
client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.content.startsWith(`${prefix}${prefix}`) || message.author.bot) {
		return
	}
	//on sending ~anything, it should append this server to   db.json

	// var currentState = null;
	// console.log(currentState);

	const args = message.content.slice(prefix.length).trim().split(' ')
	const command = args.shift().toLowerCase()

	switch (command) {
		case 'ping':
		case 'check':
		case 'online':
		case 'checkonline':
			client.commands.get('ping').execute(message, args)
			break

		case 'help':
		case 'commands':
			client.commands.get('help').execute(message, args)
			break

		case 'assign':
		case 'give':
		case 'givetask':
		case 'assigntask':
			client.commands.get('assign').execute(message, args)
			break

		case 'show':
		case 'showtask':
		case 'display':
		case 'displaytask':
			client.commands.get('show').execute(message, args)
			break

		case 'done':
		case 'donetask':
		case 'finished':
		case 'finishedtask':
			client.commands.get('done').execute(message, args)
			break

		case 'remove':
		case 'delete':
			client.commands.get('remove').execute(message, args)
			break

		case 'server':
			message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`)
			break

		case 'user-info':
			message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`)
			break

		default:
			message.channel.send('What are you sayin\' bro?? That\'s not a command!')
			message.channel.send('Use `~help` to know the commands.')
			break
	}
})

client.login(process.env.TOKEN)
	.then(r => console.log('logged in:' + r))
	.catch(err => {
		console.log(err)
	})

client.once('ready', () => {
	console.log('Logged in')
})