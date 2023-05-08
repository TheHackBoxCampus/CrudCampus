import config_path from "../../config/config_path.js"

export default class SKILL extends HTMLElement{
     static url = import.meta.url
     constructor() {
         super()
         this.attachShadow({mode: 'open'})
     }

     handleEvent(e) {   
        e.preventDefault(); 
        e.type == "submit" ? this.callMyWorkerLove(e) : false
     }

    callMyWorkerLove(e) {
        const wsSkill = new Worker('src/workers/wsSkills.js', {type: 'module'})
        let data = Object.fromEntries(new FormData(e.target))
        wsSkill.postMessage({whatFunction: e.submitter.name ,arguments: [data]})
        wsSkill.addEventListener('message', e => {
            console.log(e.data)
            wsSkill.terminate()
        })
    }

    static async component_nav() {
        return await ((await fetch(config_path.getPath(SKILL.url)[0].replace('.js', '.html'))).text())
    }     

    async connectedCallback( ) {
        let content_skill = Promise.resolve(SKILL.component_nav()).then(res => res)
        this.shadowRoot.innerHTML += await content_skill   
        this.btn = this.shadowRoot.querySelector('form')
        this.btn.addEventListener('submit', this.handleEvent.bind(this))
    }
}

customElements.define(config_path.getPath(SKILL.url)[1], SKILL)