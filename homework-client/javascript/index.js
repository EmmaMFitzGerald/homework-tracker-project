let homeworks = []
const homeworkContainer = document.querySelector(".homework-list")

const addHomework = homework => {
    const checked =  homework.completion ? 'checked'  : ''
    homeworkContainer.innerHTML += `
    <div class="cards">
        <div id="${homework.id}" class="card">
            <div class="card-content">
                <h2>${homework.subject.name}</h2>
                <p>${homework.content} </p>
                <p>Due: ${homework.date}</p>
                <p>Complete? <input id="complete-${homework.id}" onclick="completedHomework(${homework.id})" type="checkbox" ${checked}/></p>
            </div>
            <button onclick="deleteHomework(${homework.id})">Delete</button>
        </div>
    </div>
    `
}

function completedHomework(id) {
    const checkBox = document.querySelector(`#complete-${id}`)
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
    // homeworks.forEach((homework) => {
    //     console.log(homework)
    //     const checked =  homework.completion ? 'checked'  : ''
    //     homeworkContainer.innerHTML += `
    //     <div id="${homework.id}" class="card">
    //     <div class="card-content">
    //     <span class="card-title">${homework.subject.name}</span>
    //     <p>Content: ${homework.content} </p>
    //     <p>Due: ${homework.date}</p>
    //     <p>Complete? <input type="checkbox" ${checked}/></p>
    //     </div>
    //     <button onclick="deleteHomework(${homework.id})">Delete</button>
    //     </div>
    //     `
    // })
    data = fetch('http://localhost:3000/homeworks').then(response => {
        homeworks = response.json()
        homeworks.then(data => {
            data.forEach(homework => {
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
        addHomework(data)
        e.target.reset()
    })
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#homework-form').addEventListener('submit', handleSubmission)
    loadHomeworks()
})

