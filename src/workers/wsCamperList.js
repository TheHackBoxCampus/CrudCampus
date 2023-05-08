import users_API from "../../api/users_API.js";

let ws_template_team = camper => age => team => date => trainer => {
    return `
        <div>
            <b>Nombre:</b> ${camper}
            <b>Edad: </b> ${age}
            <b>Pertenece al team:</b> ${team}
            <b>Trainer:</b> ${trainer}
            <b>Empezo en el tema desde: </b> ${date}
        </div>
    `
}

let ws_template = camper => age => telefono => direccion => fechaN => 
                  Ni => fechaI => team =>{
            return `
                <div>
                    <b>Nombre:</b> ${camper}
                    <b>Edad:</b> ${age}
                    <b>Telefono:</b> ${telefono}
                    <b>Direccion:</b> ${direccion}
                    <b>Fecha Nacimiento:</b> ${fechaN}
                    <b>Identificacion:</b> ${Ni}
                    <b>Team:</b> ${team}
                    <b>Fecha de inicio:</b> ${fechaI}
                </div>
            `
    }

self.addEventListener ('message', e => {
    let h = '';
    let promise_res = users_API[e.data.whatFunction](e.data.arguments ? e.data.arguments : undefined);
        if(e.data.whatFunction == "getCampersTeam") {
            Promise.resolve(promise_res).then(res => {
                    let {nombre, trainer, reclutas} = res 
                    if(reclutas.length < 1) postMessage('<p class="undefined-campers">No tiene campers<p>')
                    else {
                        h = ""
                        for(let x = 0; x < reclutas.length; x++){
                            h += ws_template_team(reclutas[x].nombre)(reclutas[x].edad)(nombre)(reclutas[x].fechaI)(trainer)
                        }
                        postMessage(h)
                    }
                })
        }else {
            Promise.resolve(promise_res).then(res => {
                for(let prop in res) {
                 let {nombre, edad, telefono, direccion, nacimiento, documento, fechaI, teamCampusId} = res[prop]
                 h = "";
                 h += ws_template(nombre)(edad)(telefono)(direccion)(nacimiento)(documento)(fechaI)(teamCampusId)
             }
             postMessage(h) 
           }
         )
        }
})