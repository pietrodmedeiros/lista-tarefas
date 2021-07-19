const Main = {
    init: function() {
        this.selectors()
        this.callevents()
    },

    selectors: function() {
        this.checkButtons = document.querySelectorAll(".check")
        this.demoveButtons = document.querySelectorAll('.remove')
        this.inputTask = document.querySelector('#inputTask')
        this.list = document.querySelector('#list')
    },

    callevents: function() {
        const self = this
        this.checkButtons.forEach(function(button){              
                button.onclick = self.Events.checkButton_click
        })

        this.inputTask.onkeypress = self.Events.inputTask_keyPress.bind(this)
    },



    Events: {
        checkButton_click: function(e){
            const li = e.target.parentElement
            const isDone = li.classList.contains("done")
            if (!isDone) {
                li.classList.add("done")
            }else {
                li.classList.remove("done")
            }
        },

        inputTask_keyPress: function(e){
            const key = e.key
            const newTask = e.target.value

            if (key === 'Enter'){
                this.list.innerHTML += `
                    <li id="done">
                        <div class="check"></div>
                            <label class="task">
                                ${newTask}
                            </label>
                        <img class="remove" src="./img/delete.svg">
                    </li>
                `
                e.target.value = ''
                this.selectors()
                this.callevents()
            }
        }
    }
}

Main.init()