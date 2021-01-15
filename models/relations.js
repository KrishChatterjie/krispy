const user = require('./user');
const server = require('./server');
const task = require('./task');


user.belongsToMany(task, { through: 'user_tasks' });
task.belongsToMany(user, { through: 'user_task' });
user.hasMany(server,{foreignKey: 'UserID'});
