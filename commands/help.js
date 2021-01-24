module.exports = {
  name: 'help',
  description: 'List all of the commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  execute (message, args) {
    const {
      commands
    } = message.client
    const data = []

    if (!args.length) {
      data.push('Here\'s a list of all commands:')
      data.push(
        '`' + commands.map((command) => command.name).join('`, `') + '`'
      )
      data.push(
        '\nYou can send `~help [command name]` to get info on a specific command!'
      )
    } else {
      if (!commands.has(args[0])) {
        return message.reply('That\'s not a valid command, sorry.')
      }
      const command = commands.get(args[0])

      data.push(`**Name:** ${command.name}`)
      if (command.description) { data.push(`**Description:** ${command.description}`) }
      if (command.aliases) { data.push(`**Aliases:** ${command.aliases.join(', ')}`) }
      if (command.usage) { data.push(`**Usage:** \`~${command.name} ${command.usage}\``) }
    }
    message.channel.send(data.join('\n'))

    // To send msg via DMs
    /*
        message.author.send(data.join("\n"), { split: true })
            .then(() => {
                if (message.channel.type !== "dm") {
                    message.channel.send("I've sent you a DM with all commands.");
                }
            })
            .catch(() => message.reply("It seems I can't send help to you by DM."));
        */
  }
}
