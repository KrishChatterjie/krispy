### Commands:
- assign.js:
-       code for @role
-       queries the db for user_id and task_name
-       if task already exists, then throws an error
-       else sends task_name, assigned_by, assigned_to, task_status (= 0) which are to be added to the db

- done.js:
-       get the progress % from the args and send it to the database
-       sends an integer to the database
-       

- help.js:
-       define usecases clearly after everything else is done
-       merge progress and show commands

- ping.js:
-       nth to do here

- progress.js , show.js
-       merge both commands (@yajat)
-       if @role, gets the list of all members with that role and queries the db for the ongoing tasks of all those ppl
-       if @role and taskname then gets the list of all members w/ that role then for each user, queries the db userid, taskname, expects task status
-       

-       possible queries to the database:
            1. sends taskname, userid, expects taskstatus
            2. sends userid, expects all the tasks of the user including the ones completed and the tasks assigned currently


-           get progress (for role/user)

- remove.js
-       gets the taskname and the mentioned role/user and removes from the database 
-       deletes task from the database (for role/user)

- update.js
-       DELETE THIS FILE

- create a new file to fetch roles/users and ctrl-c, ctrl-v
- call ^ file from index.js, assign.js, progress.js, remove.js 

- update database when new user is added to or leaves server

- work on readme after everything else is done

