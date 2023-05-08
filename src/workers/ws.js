import users_API from "../../api/users_API.js";

self.addEventListener ('message', e => {
    e.data.argument[0].teamCampusId = parseInt(e.data.argument[0].teamCampusId)
    let promise_res = users_API[e.data.whatFunction](e.data.argument[0] ? 
        e.data.argument[0] : false, e.data.argument[1])  
        Promise.resolve(promise_res).then(res => console.log(res))    
})
