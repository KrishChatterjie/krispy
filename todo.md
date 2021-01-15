The main entry point:
-    bot is added to a server
-    then immediately it gets the list of user names, user ids, roles, users with the corresponding roles and stuff and sends it to the database
-   Checks each hour for new users and updates the database
-   


## Database:

- server_name, server_id

- user_name, user_id, server_id(fk on server)

- task_id, task_name, assigned_by(fk on user), assigned_to(fk on user), task_status

- server_id, roles_id, roles_name

- user_id, roles_id (many to many relationship)

## Main stuff
-   listens for text with the prefix, if prefix then passes the message to a function
-   List of functions/files/folders/ (hierarchy of the project)
-       index.js -> main entry point 
-           It has ...
-           It sends commands to its respective *.js file which is in the commands folder
-       commands folder
-           ping.js
-           assign.js
-           show.js
-           history.js
-           progress.js

## List of commands:
- ping
-   what it does:
-       it replies to 'ping' with 'pong'.
- assign
-   params: role/user, task name
-   notes: 
-   how it does:
-       
-       checks message.mentions
-       the remaining part is parsed as a single string which will be the task name
-       
-   what it does: 
-       sets progress to 0
-   constrains: can't assign two tasks with the same name to the same user
-   example: assign @Krish work 
-   exceptions:
-       if task name is not given   -> throws an error
-       if role user is not mentioned -> defaults to everyone in the server

-       
-       
-   backend stuff:
-       get the assigner, assignee, taskname
-       gets the corresponding assiger and asignees user ids and generates a uuid for the task name
-       stores the above stuff in the database

- show
-   params: role/user, task name
-   notes:
-   what it does:
-       shows all ongoing tasks of the user(s) with progress

- history
-   params: role/user
-   what it does:
-       shows the completed tasks

- delete
-   params: task name, user/role
-   example 

- done
-   params: taskname,  progress % (optional, def=1)
-   what it does: 
-       sets progress to to the given percentage


## What index.js will do:

- Main entry point of the program
- 