require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');

const { prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('guildCreate', guild => {
	console.log(guild.id);
	console.log(guild.name);
})

client.on('message', message => {

	// console.log(message.guild.roles);
	if (!message.content.startsWith(prefix) || message.content.startsWith(`${prefix}${prefix}`) || message.author.bot) 
		return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	
	let rolemap = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => `${r.id},${r.name}`);
            if (rolemap.length > 1024) rolemap = "To many roles to display";
            if (!rolemap) rolemap = "No roles";
	// console.log(rolemap);
	let roles = new Array();
	let role_id = 0;
	let role_name = '';
	// for (const role of rolemap) {
	// 	break;
	// }

	// Getting data
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

	if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	}
	else if (command === 'assign') {
		client.commands.get('assign').execute(message, args);
	}
	else if (command === 'help') {
		client.commands.get('help').execute(message, args);
	}
	else if (command === 'show') {
		message.channel.send('Show task.');
		//history
	}
	else if (command === 'done') {
		message.channel.send('Task completed.');
	}
	else if (command === 'progress') {
		message.channel.send('Task being done.');
	}
	else if (command === 'server') {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	}
	else if (command === 'user-info') {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	}
      
});

client.login(process.env.TOKEN);

client.once('ready', readyDiscord);

function readyDiscord() {
	console.log('Logged in');	
}
