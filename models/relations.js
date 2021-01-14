const user = require('./user');
const role = require('./role');
const server = require('./server');
const task = require('./task');

user.belongsToMany(role, { through: 'user_role' });
role.belongsToMany(user, { through: 'user_role' });
user.belongsToMany(task, { through: 'user_tasks' });
task.belongsToMany(user, { through: 'user_task' });
user.hasMany(server,{foreignKey: 'UserID'});