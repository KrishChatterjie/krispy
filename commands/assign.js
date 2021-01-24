const server = require('../models/server')
const task = require('../models/task')
const user = require('../models/user')
const uuid4 = require('uuid4')
const getInfo = require('../getrolesusers')

module.exports = {
  name: 'assign',
  aliases: ['give', 'givetask', 'assigntask'],
  usage: '@role/@user [task name]',
  description: 'Assigns task to role/user',
  execute (message, args) {
    // if role is mentioned, get a list of all users with that role from the database store it as an array
    // the elements in the array will be converted to the users object
    // if user is mentioned after that, append that user to the existing array we get from db
    // repeat the code below for all the users

    const users = message.mentions.users

    const assignees_id = new Array()
    for (const user of users) {
      const user_copy = user.slice()
      assignees_id.push(user_copy.shift())
    }

    // working
    const roles = message.mentions.roles
    async function asyncFunction () {
      for (const role of roles) {
        const x = await getInfo.getUsers(message.guild, role)
        message.channel.send(x)
      }
    }
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
    async function addtask (assignees_id, assignerId, taskName) {
      try {
			  const exist = await User.findOne({ where: { discordId: { in: assignees_id }, Serverid: message.guild.id } })
			  const exist1 = await User.findOne({ where: { discordId: assignerId, Serverid: message.guild.id } })
			  const taskk = {
          taskId: uuid4(),
          taskname: taskName,
          assignee: exist.UserId,
          assigner: exist1.UserId
			  }
			  const newTask = await task.create(taskk)
			  return {
          error: false,
          message: 'Task Successfully Created',
          code: 201,
          task: newTask
			  }
      } catch (err) {
			  return {
          error: true,
          message: 'An Error Occurred' + err,
          code: 500
			  }
      }
    }

    message.mentions.users.map(user => {
      user.send('**Task:**' + taskName + '\n**Assigned by:** <@' + message.author + '>', {
        split: true
      })
        .then(() => {
          if (message.channel.type !== 'dm') {
            message.channel.send('I\'ve assigned and sent <@' + user + '> the task.')
          }
        })
        .catch(() => message.reply('Something went wrong on <@' + user + '>\'s end :('))
    })
  }
}
