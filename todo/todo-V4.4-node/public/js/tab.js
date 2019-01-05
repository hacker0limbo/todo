class Tab {
    constructor(title, actions, callback) {
        this.title = title
        this.actions = actions
        this.callback = callback
        this.init()
    }

    buttonTemplate(title, index) {
        const t = `
            <button class='modal-action-button'
                    data-index="${index}">${title}</button>
        `
        return t
    }

    template(actionButtons) {
        const t = `
            <div class='modal-container modal-remove'>
                <div class='modal-mask'></div>
                <div class="modal-alert vertical-center">
                    <div class="modal-title">
                        ${this.title}
                    </div>
                    <div class="modal-message">
                        ${actionButtons}
                    </div>
                    <div class='modal-control'>
                        <button class="modal-button modal-action-button" data-index="-1">Cancel</button>
                    </div>
                </div>
            </div>
        `
        return t
    }

    init() {
        let buttons = []
        for (let i = 0; i < this.actions.length; i++) {
            let a = this.actions[i]
            buttons.push(this.buttonTemplate(a, i))
        }
        let actionButtons = buttons.join('')

        const t = this.template(actionButtons)
        appendHtml(e('body'), t)
            // event

        bindAll('.modal-action-button', 'click', (event) => {
            console.log('click button')
            const index = event.target.dataset.index
            this.callback(index)
            removeAll('.modal-remove')
        })

    }

}