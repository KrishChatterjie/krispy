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
	
	// 							console.log(message.guild.roles.fetch());
  


	// let role_users  = new Array();


	// for (const role of roles) {
	// 	id = role[0];
	// 	console.log(message.guild.roles.fetch(id).members);
	// }


	// console.log(message.guild.members.fetch().then(members => console.log(members)));
	
	console.log(message.member);

	// message.guild.fetch().then(g => {
	// 	g.members.fetch().then(m => {
	// 		console.log(m.user.roles.cache);
	// 		});
	// 	});

    const Members = message.guild.members.cache.map(member => `<@`+ member.user+`> `);
    message.channel.send(`XO ${Members}`);


	
	// console.log(message.guild.members.fetch());
	// console.log(message.guild.members);

	//-----------------------------------------------------------------------------------------------------------------------------------
	if (command === 'ping'||command === 'check'||command ===  'online'||command === 'checkonline') {
		client.commands.get('ping').execute(message, args);
	}
	else if (command === 'help'||command === 'commands') {
		client.commands.get('help').execute(message, args);
	}
	else if (command === 'assign'||command === 'give'||command === 'givetask'||command ===  'assigntask') {
		client.commands.get('assign').execute(message, args);
	}
	else if (command === 'show'||command ==='showtask'||command === 'display'||command === 'displaytask') {
		client.commands.get('show').execute(message, args);
	}
	else if (command === 'done'||command=== 'donetask'||command ==='finished'||command ==='finishedtask') {
		client.commands.get('done').execute(message, args);
	}
	else if (command === 'progress'||command === 'taskprogress') {
		client.commands.get('progress').execute(message, args);
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
