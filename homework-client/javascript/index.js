let homeworks = []
const homeworkContainer = document.querySelector(".homework-list")

const addHomework = homework => {
    homeworkContainer.innerHTML += `
    <div id="${homework.id}" class="card">
    <div class="card-content">
    <span class="card-title">${homework.subject}</span>
    <p>Content: ${homework.content} </p>
    <p>Due: ${homework.due_date}</p>
    <p>Complete? ${homework.completion}</p>
    </div>
    <button onclick="deleteHomework(${homework.id})">Delete</button>
    </div>
    `
}

const loadHomeworks = params => {
    homeworks.forEach((homework) => {
        homeworkContainer.innerHTML += `
        <div id="${homework.id}" class="card">
        <div class="card-content">
        <span class="card-title">${homework.subject}</span>
        <p>Content: ${homework.content} </p>
        <p>Due: ${homework.date}</p>
        <p>Complete? ${homework.completion}</p>
        </div>
        <button onclick="deleteHomework(${homework.id})">Delete</button>
        </div>
        `
    })
    data = fetch('http://localhost:3000/homeworks').then(response => {
        homeworks = response.json()
        homeworks.then(data => {
            data.forEach(homework => {
                addHomework(homework)
            })
        })
    })
}

const handleSubmission = e => {
    e.preventDefault()
    const homework = {
        subject: e.target.subject.value,
        content: e.target.homework.value,
        date: e.target.date.value,
        id: e.target.id.value
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