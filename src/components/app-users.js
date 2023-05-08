import config_path from "../../config/config_path.js"

export default class USERS extends HTMLElement {
    static url = import.meta.url
    
    static async component_users() {
        return await ((await fetch(config_path.getPath(USERS.url)[0].replace('.js', '.html'))).text())
    }

    constructor() {
        super()
        this.attachShadow({mode:"open"})
        Promise.resolve(USERS.component_users()).then(html => {
            this.shadowRoot.innerHTML = html
            this.form = this.shadowRoot.querySelector('form');
            this.select = this.shadowRoot.querySelector('#select')
            this.btn = this.shadowRoot.querySelector('#change')
            this.number = this.shadowRoot.querySelector('#id_change')
            this.form.addEventListener('submit', e => this.handleEvent(e))
            this.select.addEventListener('click', e => this.viewOptions(e))
        })
    }
    
    renderAtributes(st, methodValue, name) {
        this.number.style.display = st
        this.btn.value = methodValue
        this.btn.name = name 
    }

    viewOptions(e) {
        if(this.select.value == 'UPDATE'){
            this.drawDisabled(this.btn, 'disable', false, 'remove')
            this.renderAtributes('block', 'PUT info', 'putData')
                  
        }else {
            this.drawDisabled(this.btn, 'disable', false, 'remove')
            this.renderAtributes('block', 'DELETE info', 'deleteData')
        }
    }

    drawDisabled(i, s, f, type) {
        i.disabled = f
        i.classList[`${type}`](s); 
    }

    handleEvent(e){
        e.preventDefault();
        (e.type === "submit") ? this.callWorker(e) : undefined
    }
    
    callWorker(e) {
        e.preventDefault()
        let ws = new Worker('src/workers/ws.js', {type:'module'});
        let data = Object.fromEntries(new FormData(e.target));
        let idf = this.number.style.display != 'none' ? this.number.value : false
        ws.postMessage({whatFunction: e.submitter.name, argument: [data, !idf ? null : idf]})
        ws.addEventListener('message', e => {
            console.log(e)
            ws.terminate()
        })
    }
}

customElements.define(config_path.getPath(USERS.url)[1], USERS)