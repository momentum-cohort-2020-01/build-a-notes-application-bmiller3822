function q(selector){
    return document.querySelector(selector)
}

function getAllNotes(){
    return fetch ("http://localhost:3000/notes/", {
    method: 'GET'
    })
.then(response=>response.json())
}

function createNotesHTML(notes){
    let notesStr = '<ul id="notes-list">'
    for (const note of notes){
        notesStr+=createNoteHTML(note)
    }
    notesStr += '</ul>'
    return notesStr
}

getAllNotes().then(createNotesHTML)

function createNoteHTML(note){
    return `<li data-note-id="${note.id}">${note.note} <button class="delete">Delete</button></li>`
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

function postNewNote (noteText){
    return fetch('http://localhost:3000/notes/',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({note:noteText, done: false, created: moment().format()})
    })
    .then(response=>response.json())
}

getAllNotes().then(renderNotesList)

function deleteThisNote (noteId){
    return fetch('http://localhost:3000/notes/' + noteId,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({note:noteId, done: false, created: moment().format()})
    })
    .then(response=>response.json())
}

// console.log(document.querySelector(".delete")) 

function deleteNote(){
    q('#notes').addEventListener('click', event=>{
        if (event.target.matches('.delete')){
            event.target.parentElement.classList.add("noteToDelete")
            let noteId = (event.target.parentElement.dataset.noteId)
            deleteThisNote(noteId)
        }   
    }
    )
}

deleteNote()

console.log("Nothing broken!")




//Example I'm currently playing with:
// print('delete ' + event.target.parentElement.dataset.todoId)

// if(event.target.matches('.delete')){
//     print(event.target)
//     print(event.target.parentElement.dataset.todoId)     (Can magic it up if it has data-note-ID on the LI,)
// }
// })


//======================Notes and other nonsense======================================================================
//This keeps breaking things due to not being able to iterate but I'm going to press on.  Other option is right below. 
// getAllNotes()
//     .then(notes=>createNotesHTML(notes))
//     .then(html=>{
//         const notesSection = document.querySelector('#notes')
//         notesSection.innerHTML=html
//     })

// I'll add this back later when I have more things to give it to iterate. 


// const moment = require("moment")
// Commenting this out again per my conversation with Rebecca at 9:50pm EST on Thursday evening.  Am I insane?

// const moment = require("moment")
//Do I need this?
