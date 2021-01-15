require('dotenv').config();

const fs = require('fs');

const Discord = require('discord.js');

const { prefix } = require('./config.json');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const { Console } = require('console');

const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('guildCreate', guild => {
	
	console.log(guild.id);
	console.log(guild.name);

})

client.on('message', message => {
	
	if (!message.content.startsWith(prefix) || message.content.startsWith(`${prefix}${prefix}`) || message.author.bot) 
	return;
	
	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	
	let rolemap = message.guild.roles.cache
	.sort((a, b) => b.position - a.position)
	.map(r => `${r.id},${r.name}`);
	if (rolemap.length > 1024) rolemap = "To many roles to display";
	if (!rolemap) rolemap = "No roles";
	
	let roles = new Array();
	for (const role of rolemap) {
		let roleData = role.split(',');
		roles.push([roleData[0], roleData[1]]);
	}
	// roles -> a 2d array with role names and corresponding ids
	
	
	
	//------------------------------------------Working space------------------------------------------------------------------------

	let users = new Array();
	message.guild.members.fetch().then(members => {
		members.map(member => {
			users.push([member.user.id, member.user.username]);
		});
		let role_user = new Array();
		for (const role of roles) {
			role_id = role[0];
			role_user.push([role_id, new Array()]);
			for (const user of users) {
				user_id = user[0];
				user_obj = message.guild.members.cache.get(user_id)
				if (user_obj.roles.cache.some((role) => role.id == role_id)) {
					idx = role_user.length - 1;
					role_user[idx][1].push(user_id);
				}
			}
		}
		console.log(role_user);
	});

	//-----------------------------------------------------------------------------------------------------
	switch(command){

		case 'ping':
		case 'check':
		case 'online':
		case 'checkonline':
			client.commands.get('ping').execute(message, args);
			break;

		case 'help':
		case 'commands':
			client.commands.get('help').execute(message, args);
			break;

		case 'assign':
		case 'give':
		case 'givetask':
		case 'assigntask':
			client.commands.get('assign').execute(message, args);
			break;

		case 'show':
		case 'showtask':
		case 'display':
		case 'displaytask':
			client.commands.get('show').execute(message, args);
			break;

		case 'done':
		case 'donetask':
		case 'finished':
		case 'finishedtask':
			client.commands.get('done').execute(message, args);
			break;

		case 'progress':
		case 'taskprogress':
			client.commands.get('progress').execute(message, args);
			break;

		case 'update':
		case 'refresh':
			client.commands.get('update').execute(message, args);
			break;

		case 'remove':
		case 'delete':
			client.commands.get('remove').execute(message, args);
			break;


		case 'server':
			message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
			break;

		case 'user-info':
			message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
			break;
		
		default:
			message.channel.send(`What are you sayin' bro?? That's not a command!`);
			message.channel.send(`Use \`~help\` to know the commands.`);
			break;
	}
	// if (command === 'ping'||command === 'check'||command ===  'online'||command === 'checkonline') {
	// 	client.commands.get('ping').execute(message, args);
	// }
	// else if (command === 'help'||command === 'commands') {
	// 	client.commands.get('help').execute(message, args);
	// }
	// else if (command === 'assign'||command === 'give'||command === 'givetask'||command ===  'assigntask') {
	// 	client.commands.get('assign').execute(message, args);
	// }
	// else if (command === 'show'||command ==='showtask'||command === 'display'||command === 'displaytask') {
	// 	client.commands.get('show').execute(message, args);
	// }
	// else if (command === 'done'||command=== 'donetask'||command ==='finished'||command ==='finishedtask') {
	// 	client.commands.get('done').execute(message, args);
	// }
	// else if (command === 'progress'||command === 'taskprogress') {
	// 	client.commands.get('progress').execute(message, args);
	// }
	// else if (command === 'server') {
	// 	message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	// }
	// else if (command === 'user-info') {
	// 	message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	// }
      
});

client.login(process.env.TOKEN);

client.once('ready', readyDiscord);

function readyDiscord() {
	console.log('Logged in');	
	
}
