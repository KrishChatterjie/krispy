// module.exports = {
//     hello: function() {
//        console.log("Hello");
//        return;
//     },
//     getRolesUsers: (guild) =>  {
//         let rolemap = guild.roles.cache
//         .sort((a, b) => b.position - a.position)
//         .map(r => `${r.id},${r.name}`);
//         if (rolemap.length > 1024) rolemap = "To many roles to display";
//         if (!rolemap) rolemap = "No roles";
        
//         let roles = new Array();
//         for (const role of rolemap) {
//             let roleData = role.split(',');
//             roles.push([roleData[0], roleData[1]]);
//         }
//         // roles -> a 2d array with role names and corresponding ids
//         // database WORK, update existing users or create new
        
//         let users = new Array();
//         guild.members.fetch().then(members => {
//             members.map(member => {
//                 users.push([member.user.id, member.user.username]);
//             });
//             let role_user = new Array();
//             for (const role of roles) {
//                 role_id = role[0];
//                 role_user.push([role_id, new Array()]);
//                 for (const user of users) {
//                     user_id = user[0];
//                     user_obj = guild.members.cache.get(user_id)
//                     if (user_obj.roles.cache.some((role) => role.id == role_id)) {
//                         idx = role_user.length - 1;
//                         role_user[idx][1].push(user_id);
//                     }
//                 }
//             }
//             console.log(role_user)
//             // role_user -> 2d array with role id and list of names
//             // database WORK, update existing users or create new
//         });
//     },
//     getRoles : (guild) => {
//         let roles = new Array();
//         for (const role of rolemap) {
//             let roleData = role.split(',');
//             roles.push([roleData[0], roleData[1]]);
//         }
//         return roles;
//     },
//     getRoleMembers : (guild, roleID) => {
//         // let rolemap = guild.roles.cache
//         // .sort((a, b) => b.position - a.position)
//         // .map(r => `${r.id},${r.name}`);
//         // if (rolemap.length > 1024) rolemap = "To many roles to display";
//         // if (!rolemap) rolemap = "No roles";
        
//         let roles = getRoles(guild);
//         // roles -> a 2d array with role names and corresponding ids
        
//         let users = new Array();
//         guild.members.fetch().then(members => {
//             members.map(member => {
//                 users.push([member.user.id, member.user.username]);
//             });
//             let role_user = new Array();
//             for (const role of roles) {
//                 role_id = role[0];
//                 role_user.push([role_id, new Array()]);
//                 for (const user of users) {
//                     user_id = user[0];
//                     user_obj = guild.members.cache.get(user_id)
//                     if (user_obj.roles.cache.some((role) => role.id == role_id)) {
//                         idx = role_user.length - 1;
//                         role_user[idx][1].push(user_id);
//                     }
//                 }
//             }
    
//             // role_user -> 2d array with role id and list of names
//             // database WORK, update esxisting users or create new
    
//             // --------- NEW STUFF
//         });
//     },
//     getUsers : (guild, role) => {
//         //if role or user no mentioned in message, role = @everyone
//         // all 

//         let users = new Array();
//         guild.members.fetch().then(members => {
//             members.map(member => {
//                 users.push([member.user.id, member.user.username]);
//             });
//             let usersReqd = new Array();
//             for (const user of users) {
//                 user_id = user[0];
//                 user_obj = guild.members.cache.get(user_id);
//                 if (user_obj.roles.cache.some((role) => role == role)) {
//                     usersReqd.push(user_id);
//                 }
//             }
//             console.log(usersReqd);
//             // role_user -> 2d array with role id and list of names
//             // database WORK, update existing users or create new
//         });
//     }
//  }

const getUsers = (guild, role) => {
    //if role or user no mentioned in message, role = @everyone
    // all 
    role_id = role.id;
    let users = new Array();
    guild.members.fetch().then(members => {
        members.map(member => {
            users.push([member.user.id, member.user.username]);
        });
        let usersReqd = new Array();
        for (const user of users) {
            user_id = user[0];
            user_obj = guild.members.cache.get(user_id);
            if (user_obj.roles.cache.some((role) => role_id == role.id)) {
                usersReqd.push(user_id);
            }
        }
        console.log(usersReqd);
        return usersReqd;
        // role_user -> 2d array with role id and list of names
        // database WORK, update existing users or create new
    });
}

exports.getUsers = getUsers;