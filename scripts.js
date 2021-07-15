const Main = {
    init: function() {
        this.selectors()
        this.callevents()
    },

    selectors: function() {
        this.checkButtons = document.querySelectorAll(".check")
        this.demoveButtons = document.querySelectorAll('.remove')
    },

    callevents: function() {
        const self = this
        this.checkButtons.forEach(function(button){
            button.onclick = self.Events.checkbutton_click
        });
    },



    Events: {
        checkbutton_click: function(e){
            const li = e.target.parentElement
            li.classList.add("done")
        }
    }
}

Main.init()