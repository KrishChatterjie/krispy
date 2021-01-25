module.exports = {
	name: 'done',
	aliases: ['donetask', 'finished', 'finishedtask'],
	usage: '[task name] [__%]',
	description: 'Completes the task',
	execute(message, args) {
		
		const user = message.author;
		const user_id = user.id;
		
		let prog = args.pop();
		
		try {
			prog = parseInt((prog.slice(0, prog.length - 1)));
		} catch {
			message.channel.send("Dumb or what? Do it properly.");
			return
		}
		
		const taskName = args.join(' ');

    //db
    
		async function addtask(assignees_id, assignerId, taskName) {
			try {
				const exist = await user.findOne({
					where: {
						discordId: assignees_id,
						ServerId: message.guild.id
					}
				})
				const exist1 = await user.findOne({
					where: {
						discordId: assignerId,
						ServerId: message.guild.id
					}
				})
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

		// const a = await addtask(assignees_id, message.author.id, taskName)
		const a = await donetask(user_id, taskName, prog)
		console.log(a)
    
    //db
		
	}
}