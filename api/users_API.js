let url = 'http://localhost:5000/'

export default {
    async getCampers() {
        let data = await (await fetch(url+"reclutas?fechaI=2", {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
            }
        })).json()
        return data
    }, 

    async getCampersTeam(id) {
        let data = await (await fetch(url+`teamCampus/${id}?_embed=reclutas`, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
            }
        })).json()
        return data
    },
    async getModules(id) {
        let data = await (await fetch(url+`ModuloSkill/${id}?_embed=Skills`, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
            }
        })).json()
        return data
    },

    async postData(post_content){
        let data = await (await fetch(url+"reclutas", {
            method: 'POST',
            body: JSON.stringify(post_content),
            headers: {  
                'Content-type' : 'application/json'
            }
        })).json()
        return data
    },
    
    async postModules(post_data_modules){
        let data = await (await fetch(url+"Skills", {
            method: 'POST',
            body: JSON.stringify(post_data_modules),
            headers: {  
                'Content-type' : 'application/json'
            }
        })).json()
        return data 
    },

    async putData(put_content, id) {
        let data = await (await fetch(url+"reclutas"+`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(put_content),
            headers: {
                'Content-type' : 'application/json'
            }
        })).json()
        return data ? data : {result: 'invalid'}
    },

    async deleteData(d,id){
        let data = await (await fetch(url+"reclutas"+`/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json'
            }
        })).json()
        return data ? data : {result: 'invalid'}
    }
}