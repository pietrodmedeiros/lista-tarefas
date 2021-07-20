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
            button.onclick = self.Events.deleteButton_click.bind(self)
        })
    },

    getLocalStorage: function() {
        const tasks = localStorage.getItem('tasks')

        if (tasks) {
            this.tasks = JSON.parse(tasks)
        } else {
            localStorage.setItem('tasks', JSON.stringify([]))
        }
    },


    getTaskHtml: function(task){
        return `
            <li id="done">
                <div class="check"></div>
                <label class="task">
                    ${task}
                </label>
                <img class="remove" data-task="${task}" src="./img/delete.svg">
            </li>
            `
    },
    showTasks: function(){
        let html = ''
        this.tasks.forEach(task =>{
            html += this.getTaskHtml(task.task)
            
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
            const value = e.target.dataset['task']

            const newTasks = this.tasks.filter(task => task.task !== value)
            localStorage.setItem('tasks', JSON.stringify(newTasks))
            this.tasks = newTasks


            li.classList.add("hidden1")
            setTimeout(function(){
                li.classList.add("hidden2")
            },300)

        },

/*         deleteAllTasksButton_click: function(e){
            const li = e.target.parentElement
            const value = e.target.dataset['task']
            
            EmptyTasks = []
            const jsonEmptyTasks = JSON.stringify(EmptyTasks)

            localStorage.setItem('tasks', jsonEmptyTasks)
            this.tasks = EmptyTasks
            li.classList.add("hidden1")
            setTimeout(function(){
                li.classList.add("hidden2")
            },300)
            
            this.showTasks(EmptyTasks)
        }, */

        inputTask_keyPress: function(e){
            const key = e.key
            const newTask = e.target.value

            if (key === 'Enter'){
                this.list.innerHTML += this.getTaskHtml(newTask)
                
                e.target.value = ''
                this.selectors()
                this.callEvents()

                const savedTasks = localStorage.getItem('tasks')
                const savedTasksArr = JSON.parse(savedTasks)


                const arrTasks = [
                    { task: newTask },
                    ...savedTasksArr,
                ]
                
                const jsonTasks = JSON.stringify(arrTasks)
                this.tasks = arrTasks
                localStorage.setItem('tasks', jsonTasks)
            }
        }
    }
}

Main.init()