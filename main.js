// const moment = require("moment")
//Do I need this?

function q(selector){
    return document.querySelector(selector)
}

function getAllNotes(){
    return fetch ("http://localhost:3000/notes/", {
    method: 'GET'
    })
.then(response=>response.json())
.then(notes=>console.log(notes))
}

function createNotesHTML(notes){
    let notesStr = '<ul id="notes-list">'
    for (const note of notes){
        notesStr+=createNoteHTML(note)
    }
    notesStr += '</ul>'
    return notesStr
}

function createNoteHTML(note){
    return `<li data-todo-id="${note.id}">${note.note} <button class="delete">Delete</button></li>`
}

function renderNotesList(notes) {
    const notesHTML = createNotesHTML(notes)
    const notesSection = document.querySelector('#notes')
    notesSection.innerHTML = notesHTML
}

q ("#new-note-form").addEventListener('submit', event=>{
    event.preventDefault();
    const noteTextField = q('#note-text').value  //This line will eventually become multiple functions.  See right below.
    fetch("http://localhost:3000/notes/", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            note:noteTextField,done:false,create:moment().format()})
    })
})
//This is what I was referring to:
// q('#new-todo-form').addEventListener('submit', event => {
//     event.preventDefault()
//     const todoTextField = q('#todo-text')
//     const todoText = todoTextField.value
//     todoTextField.value = ''
//     postNewTodo(todoText).then(renderNewTodo)
//   })

//This keeps breaking things due to not being able to iterate but I'm going to press on.  Other option is right below. 
// getAllNotes()
//     .then(notes=>createNotesHTML(notes))
//     .then(html=>{
//         const notesSection = document.querySelector('#notes')
//         notesSection.innerHTML=html
//     })

// I'll add this back later when I have more things to give it to iterate. 
// getAllNotes().then(renderNotesList)

console.log("Nothing broken!")