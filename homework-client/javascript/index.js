let homeworks = []
const homeworkContainer = document.querySelector(".homework-list")
class Homework {
    constructor(data){
        this.id = data.id
        this.date = data.date
        this.subject = data.subject
        this.content = data.content
        this.checked = data.completion ? 'checked'  : ''
    }

    render() {
        return `
        <div id="${this.id}" class="card">
            <div class="card-content">
                <h2>${this.subject.name}</h2>
                <p>${this.content} </p>
                <p>Due: ${this.date}</p>
                <p>Complete? <input id="complete-${this.id}" onclick="completedHomework(${this.id})" type="checkbox" ${this.checked}/></p>
            </div>
            <button onclick="deleteHomework(${this.id})">Delete</button>
        </div>
        `
    }

}

const addHomework = homework => {
    homeworkContainer.innerHTML += homework.render()
}

function completedHomework(id) {
    const checkBox = document.querySelector(`#complete-${id}`);
        const data = {
        homework: {
            completion: checkBox.checked
        }
    }

    fetch(`http://localhost:3000/homeworks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    })
}

const loadHomeworks = params => {
    data = fetch('http://localhost:3000/homeworks').then(response => {
        homeworks = response.json()
        homeworks.then(data => {
            data.forEach(homeworkData => {
                const homework = new Homework(homeworkData)
                addHomework(homework)
            })
        })
    })
}

function deleteHomework(id) {
    document.getElementById(`${id}`).remove()
    fetch(`http://localhost:3000/homeworks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}

const handleSubmission = e => {
    e.preventDefault()
    const homework = {
        homework: {
            content: e.target.homework.value,
            date: e.target.date.value,
            id: e.target.id.value
        },
        subject: {
            name: e.target.subject.value
        }
    }
    fetch('http://localhost:3000/homeworks',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(homework)
    }).then(res => {
        return res.json()
    })
        .then(data => {
        const homework = new Homework(data)
        addHomework(homework)
        e.target.reset()
    })
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#homework-form').addEventListener('submit', handleSubmission)
    loadHomeworks()
})


