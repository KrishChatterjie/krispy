require('dotenv').config();
const Discord = require('discord.js');

const {prefix} = require('./config.json');

const client = new Discord.Client();

let TOKEN = "#Nzk4NjAxNDA1MjkxNDI5OTUw.X_3ZhA.tDMJ_7PPCAi_M2qTwIDqbX6dm6o#";

TOKEN = TOKEN.slice(1, TOKEN.length-1);

client.on('message', message => {

    if (message.content.startsWith(`${prefix}`)) {
		
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
       
	}    
});

client.login(TOKEN);

client.once('ready', readyDiscord);

function readyDiscord() {
	console.log('Logged in');
}
