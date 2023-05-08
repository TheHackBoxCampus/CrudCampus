import users_API from "../../api/users_API.js"

self.addEventListener('message', e => {
    e.data.arguments[0].ModuloSkillId = parseInt(e.data.arguments[0].ModuloSkillId)
    let pormise_skills = users_API[e.data.whatFunction](e.data.arguments[0] ? 
        e.data.arguments[0] : false, e.data.arguments[1])
    Promise.resolve(pormise_skills).then(res => postMessage(res))
})