const container = document.querySelector("main")
const addProject = document.querySelector(".add-project")
const newForm = document.querySelector("#new-project-form")
const newItem = document.querySelector("#new-item-form")
const submitProject = document.querySelector(".make-project")
const submitItem = document.querySelector(".make-item")
let buttons;
let item;
let listItems;

const Dom = {
    makeElement(tag, reference, string = "") {
        const temp = document.createElement(tag)
        temp.textContent = string
        if(reference != undefined) temp.classList.add(reference)
        return temp
    }
}

class Item {
    constructor(title, description, time) {
        this.title = title;
        this.description = description;
        this.time = {
            date: time[0],
            clock: time[1],
        }
    }

}

class Project {
    constructor(title, items = []) {
        this.title = title;
        this.items = items;
    }

    addButtons(project = this) {
        const box = Dom.makeElement("div", "button-box")
        box.appendChild(Dom.makeElement("button", "button-add", "Add"))
        box.appendChild(Dom.makeElement("button", "button-delete", "Delete"))
        return box
    }
    
    addItem(item) {
        const box = Dom.makeElement("li", "item-box")
        const checkbox = Dom.makeElement("input")
        const itemId = item.title.toLowerCase().replace(/\s/g,'')
        checkbox.setAttribute("id", itemId)
        checkbox.setAttribute("type", "checkbox")
        box.appendChild(checkbox)
        const label = Dom.makeElement("label", "list-label", item.title)
        label.setAttribute("for", itemId)
        box.appendChild(label)
        return box
    }

    addProject(project = this) {
        const temp = Dom.makeElement("div", "project")
        temp.appendChild(Dom.makeElement("h2", "project-title", project.title))
        temp.appendChild(this.addButtons())

        const projectList = Dom.makeElement("ul", "project-list")
        for(let i in project.items) {
            projectList.appendChild(this.addItem(project.items[i]))
        }

        temp.appendChild(projectList)
        container.appendChild(temp)
    }
}

function addCreateItem() {
    newItem.removeAttribute("style", "display: hidden;")
    newItem.setAttribute("style", "display: grid;")
}

function addAll(arr = []) {
    arr.forEach(i => {
        i.addProject()
    })
    buttons = document.querySelectorAll(".project button")
    buttons.forEach(btn => {
        btn.addEventListener("click", (event) => {
            const className = event.target.classList[0]
            switch(className) {
                case "button-add":
                    item = event.target.parentNode.parentNode
                    projects.forEach((element, index) => {
                        if(element.title == event.target.parentNode.parentNode.firstChild.textContent) {
                            addCreateItem()
                        }
                    })
                    break
                case "button-delete":
                    const name = event.target.parentNode.parentNode.firstChild.textContent
                    projects.forEach((element, index) => {
                        if(element.title == name) {
                            projects.splice(index, 1)
                        }
                    })
                    removeAll()
                    addAll(projects)
                    break
            }
        })
    })

    document.querySelectorAll("li > label").forEach((e) => e.addEventListener("click", (event) => {
        for(let i = 0; i <= projects.length - 1; i++) {
            console.log("Outer loop I: " + i)
            for(let j = 0; j <= projects[i].items.length -1; j++) {
                console.log("Inner loop J: " + j)
                if(projects[i].items[j].title == event.target.parentNode.lastChild.textContent) {
                    setTimeout(() => {
                        projects[i].items.splice(j, 1)
                        removeAll()
                        addAll(projects)
                    }, 1000);
                }
            }
        }
    }))
}

function removeAll() {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
      }
}

const testProject1 = new Project("Monday", [new Item("Tie shoelace", "Tie the left one, and then the right", ["21/08/2024", "14:30"]), new Item("Tennis training", "Make sure to bring the racket", ["23/09/2025", "18:00"])])
const testProject2 = new Project("Tuesday", [new Item("Eat breakfast", "Some delicious Nutrigrain...", ["22/08/2024", "7:30"]), new Item("Basketball training", "Make sure to bring a basketball", ["24/09/2025", "17:30"])])

const projects = [testProject1, testProject2]

addAll(projects)


addProject.addEventListener("click", () => {
    newForm.removeAttribute("style", "display: hidden;")
    newForm.setAttribute("style", "display: grid;")
})

submitProject.addEventListener("click", (event) => {
    event.preventDefault()
    let title = document.querySelector("#new-project-form input").value

    newForm.removeAttribute("style", "display: grid;")
    newForm.setAttribute("style", "display: hidden;")

    removeAll()
    projects.push(new Project(title))
    addAll(projects)
})

submitItem.addEventListener("click", (event) => {
    event.preventDefault()
    let title = document.querySelector("#new-item-form #title").value
    let desc = document.querySelector("#new-item-form #desc").value
    let time = [document.querySelector("#new-item-form #date").value, document.querySelector("#new-item-form #time").value]
    projects.forEach((i, ind) => {
        if(i.title == item.firstChild.textContent) {
            projects[ind].items.push(new Item(title, desc, time))
            console.log(projects)
        }
    })

    removeAll()
    addAll(projects)

    newItem.removeAttribute("style", "display: grid;")
    newItem.setAttribute("style", "display: hidden;")
})