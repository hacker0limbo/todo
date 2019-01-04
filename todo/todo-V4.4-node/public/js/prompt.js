class Prompt {
    constructor(title, action) {
        this.title = title
        this.action = action
        this.init()
    }

    template() {
        const t = `
            <div class='modal-container modal-remove'>
                <div class='modal-mask'></div>
                <div class="modal-alert vertical-center">
                    <div class="modal-title">
                        ${this.title}
                    </div>
                    <div class="modal-message">
                        <input class='modal-input' type='text'>
                    </div>
                    <div class='modal-control'>
                        <button class="modal-button" data-type="cancel">Cancel</button>
                        <button class="modal-button" data-type="ok">Ok</button>
                    </div>
                </div>
            </div>
        `
        return t
    }

    init() {
        const t = this.template()
        appendHtml(e('body'), t)
        bindAll('.modal-button', 'click', (event) => {

            console.log('click button')
            var type = event.target.dataset.type

            if (type === 'cancel') {
                this.action(false)
            } else {
                var input = e('.modal-input').value
                this.action(true, input)
            }
            removeAll('.modal-remove')
        })
    }
}