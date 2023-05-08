import config_path from "../../config/config_path.js"

export default class LIST_CAMPERS extends HTMLElement{
     static url = import.meta.url
     constructor() {
         super()
         this.attachShadow({mode: 'open'})
     }

     handleEvent(e) {
        e.preventDefault(); 
        e.type == 'click' ? this.callWokerTemplate(e) : false
    }

     viewContent(data) {
        this.shadowRoot.querySelector('.result').innerHTML = data
     }

     callWokerTemplate(e) {
        let ws = new Worker('src/workers/wsCamperList.js', {type:'module'});
        ws.postMessage({whatFunction: e.target.name, arguments:this.selectListCamper.value})
        ws.addEventListener('message', res => {
            console.log(res.data)
            this.viewContent(res.data)
            ws.terminate()
        })
     }

    static async component_nav() {
        return await ((await fetch(config_path.getPath(LIST_CAMPERS.url)[0].replace('.js', '.html'))).text())
    }

    async connectedCallback() {
        let content_list_campers = Promise.resolve(LIST_CAMPERS.component_nav()).then(res => res)
        this.shadowRoot.innerHTML += await content_list_campers  
        this.btnListCamper = this.shadowRoot.querySelector('button') 
        this.selectListCamper = this.shadowRoot.querySelector('select')
        this.btnSelectCamper = this.shadowRoot.querySelector('div button')
        this.btnSelectCamper.addEventListener('click', this.handleEvent.bind(this))
        this.btnListCamper.addEventListener('click', this.handleEvent.bind(this))
    }
}

customElements.define(config_path.getPath(LIST_CAMPERS.url)[1], LIST_CAMPERS)