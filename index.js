require('dotenv').config();
const Discord = require('discord.js');

const {prefix} = require('./config.json');

const client = new Discord.Client();

const TOKEN = process.env.TOKEN;

client.on('message', message => {
	if (message.content.startsWith(`${prefix}assign`)) {
		message.channel.send('Assigned task.');
	}
	else if (message.content.startsWith(`${prefix}show`)) {
		message.channel.send('Show task.');
		//history
	}
	else if (message.content.startsWith(`${prefix}done`)) {
		message.channel.send('Task completed.');
	}
	else if (message.content.startsWith(`${prefix}progress`)) {
		message.channel.send('Task being done.');
	}
	else if (message.content === `${prefix}server`) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	}
	else if (message.content === `${prefix}user-info`) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
    // useless change
    
});

client.login(TOKEN);

client.once('ready', readyDiscord);

function readyDiscord() {
	console.log('Logged in');
}
