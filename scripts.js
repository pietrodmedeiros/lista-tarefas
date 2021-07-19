const Main = {

    tasks: [],

    init: function() {
        this.selectors()
        this.callEvents()
        this.getLocalStorage()
        this.showTasks()
    },

    selectors: function() {
        this.checkButtons = document.querySelectorAll(".check")
        this.removeButtons = document.querySelectorAll('.remove')
        this.inputTask = document.querySelector('#inputTask')
        this.list = document.querySelector('#list')
    },

    callEvents: function() {
        const self = this
        this.checkButtons.forEach(function(button){              
                button.onclick = self.Events.checkButton_click
        })

        this.inputTask.onkeypress = self.Events.inputTask_keyPress.bind(this)

        this.removeButtons.forEach(function(button){
            button.onclick = self.Events.deleteButton_click
        })
    },

    getLocalStorage: function() {
        const tasks = localStorage.getItem('tasks')
        this.tasks = JSON.parse(tasks)
    },

    showTasks: function(){
        let html = ''
        this.tasks.forEach(task =>{
            html += 
            `
                <li id="done">
                    <div class="check"></div>
                    <label class="task">
                        ${task.task}
                    </label>
                    <img class="remove" src="./img/delete.svg">
                </li>
            `
        })

        this.list.innerHTML = html

        this.selectors()
        this.callEvents()
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

        deleteButton_click: function(e){
            const li = e.target.parentElement
            li.classList.add("hidden1")
            setTimeout(function(){
                li.classList.add("hidden2")
            },300)
        },

        inputTask_keyPress: function(e){
            const key = e.key
            const newTask = e.target.value

            if (key === 'Enter'){
                this.list.innerHTML += 
                `
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
                this.callEvents()

                const savedTasks = localStorage.getItem('tasks')
                const savedTasksObj = JSON.parse(savedTasks)


                const obj = [
                    { task: newTask },
                    ...savedTasksObj,
                ]

                localStorage.setItem('tasks', JSON.stringify(obj))
            }
        }
    }
}

Main.init()