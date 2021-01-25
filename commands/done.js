module.exports = {
  name: 'done',
  aliases: ['donetask', 'finished', 'finishedtask'],
  usage: '[task name] [__%]',
  description: 'Completes the task',
  execute (message, args) {
    // message.channel.send('Done... but what?');
    const user = message.author;
    const user_id = user.id;
    let prog = args.pop();
    try{
      prog = int(prog.slice(0,prog.length-1));
    }
    catch {
      message.channel.send("Dumb or what?");
      return
    }
    
    const taskName = args.join(' ');
    console.log(taskName, prog);
  }
}
