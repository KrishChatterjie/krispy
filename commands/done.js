module.exports = {
	name: 'done',
	aliases: ['donetask', 'finished', 'finishedtask'],
	usage: '[task name] [__%]',
	description: 'Completes the task',
	execute(message, args) {
		// message.channel.send('Done... but what?');
		console.log(args);
		const user = message.author;
		const user_id = user.id;
		let prog = args.pop();
		console.log(prog);
		try {
			prog = int(prog.slice(0, prog.length - 1));
			console.log('try', typeof (prog));
		} catch {
			console.log('catch', typeof (prog));
			message.channel.send("Dumb or what? Changes made");
			return
		}
		console.log('Out');
		const taskName = args.join(' ');
		console.log(taskName, prog);
	}
}