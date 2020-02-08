let editTextBox = q("#note-text")
let editInput = q("edit-text")
var newInput = document.createElement("input")
var newForm = document.createElement("form")

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

function editNoteHTML(note){
    let notesStr = '<ul id="notes-list">'
    notesStr+=editNoteHTML(note)
    notesStr += '</ul>'
    return notesStr
}

function createNoteHTML(note){
    return `<li class="title" data-node-id="${note.id}">${note.title}</li>   <li data-note-id="${note.id}">${note.note} <button class="edit">Edit</button><button class="delete">Delete</button></li>`
}

function editNoteHTML(note){
    return `<li data-note-id="${note.id}">${note.note}</li>`
}

function renderNotesList(notes) {
    const notesHTML = createNotesHTML(notes)
    const notesSection = q('#notes')
    notesSection.innerHTML = notesHTML
}

function renderEditNote(note){
    const noteHTML = editNoteHTML(note)
    const notesSection = q(event.target.parentElement)
    notesSection.innerHTML = noteHTML
}

q ("#new-note-form").addEventListener('submit', event=>{
    event.preventDefault();
    const titleTextField = q('#note-title').value
    const noteTextField = q('#note-text').value  //This line will eventually become multiple functions.  See right below.
    fetch("http://localhost:3000/notes/", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            note:noteTextField, title:titleTextField, done:false, create:moment().format()})
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

function postNewNote (titleText, noteText){
    return fetch('http://localhost:3000/notes/',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({note:noteText, title: titleText, note: noteText, done: false, created: moment().format()})
    })
    .then(response=>response.json())
}

function deleteThisNote (noteId){
    return fetch('http://localhost:3000/notes/' + noteId,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({note:noteId, done: false, created: moment().format()})
    })
    .then(response=>response.json())
}

function deleteNote(){
    q('#notes').addEventListener('click', event=>{
        if (event.target.matches('.delete')){
            event.target.parentElement.classList.add("noteToDelete")
            let noteId = (event.target.parentElement.dataset.noteId)
            // console.log(event.target.parentElement.dataset)
            deleteThisNote(noteId)
        }   
    }
    )
}

function editThisNote (noteId, editedNote){ //addElement??  <li data-note-id="${note.id}">${note.note}</li>
    return fetch('http://localhost:3000/notes/' + noteId,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({note:editedNote.value, done: false, edited: moment().format()})
    })
    .then(response=>response.json())
}

//Possible const declaration for the function?

function editNote(){
    q('#notes').addEventListener('click', event=>{
        
        if (event.target.matches('.edit')){
            event.preventDefault();
            event.target.parentElement.classList.add("noteToEdit")
            event.target.parentElement.value=""
                let newEditForm = event.target.parentElement.appendChild(newForm)
                let editedNote = newEditForm.appendChild(newInput)
                editedNote.parentElement.classList.add("editClass")
                q(".editClass").addEventListener('submit', event=>{
                    event.preventDefault();
                let noteId = (event.target.parentElement.dataset.noteId)
                editThisNote(noteId, editedNote) //OMG IT WORKED I AM ALL THAT IS MAN!!!!
            })          
        }   
    }, false
    )
}

//What if I create a second thing to pass into the function...Do I need a form for submit?  If so, how and when? 

// const el = document.getElementById("outside");
// el.addEventListener("click", modifyText, false)    <<<This has a function

getAllNotes().then(createNotesHTML)
getAllNotes().then(renderNotesList)
deleteNote()
editNote()

console.log("Nothing broken!")

// noteSubmit.addEventListener("submit", event => {
//     event.preventDefault();
//     const titleTextField = document.querySelector("#note-title");
//     const noteTextField = document.querySelector("#note-text");
//     const titleText = titleTextField.value;
//     const noteText = noteTextField.value;
//     titleText.value = "";
//     noteTextField.value = "";
//     postNewNote(titleText, noteText).then();
//   });
//   function postNewNote(titleText, noteText) {
//     return fetch("http://localhost:3000/notes/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title: titleText,
//         note: noteText,
//         done: false,
//         created: moment().format()
//       })
//     }).then(response => response.json());
//   }

//Things still to do:
// - Edit the note
// - Style the hell out of this



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













//This works and I'm about to break it for the edit feature.
// let editTextBox = q("#note-text")
// let editInput = q("edit-text")

// function q(selector){
//     return document.querySelector(selector)
// }

// function getAllNotes(){
//     return fetch ("http://localhost:3000/notes/", {
//     method: 'GET'
//     })
// .then(response=>response.json())
// }

// function createNotesHTML(notes){
//     console.log(notes)
//     let notesStr = '<ul id="notes-list">'
//     for (const note of notes){
//         notesStr+=createNoteHTML(note)
//     }
//     notesStr += '</ul>'
//     return notesStr
// }

// function createNoteHTML(note){
//     return `<li class="title" data-node-id="${note.id}">${note.title}</li>   <li data-note-id="${note.id}">${note.note} <button class="edit">Edit</button><button class="delete">Delete</button></li>`
// }

// function renderNotesList(notes) {
//     const notesHTML = createNotesHTML(notes)
//     const notesSection = document.querySelector('#notes')
//     notesSection.innerHTML = notesHTML
// }

// q ("#new-note-form").addEventListener('submit', event=>{
//     event.preventDefault();
//     const titleTextField = q('#note-title').value
//     const noteTextField = q('#note-text').value  //This line will eventually become multiple functions.  See right below.
//     fetch("http://localhost:3000/notes/", {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             note:noteTextField, title:titleTextField, done:false, create:moment().format()})
//     })
// })
// //This is what I was referring to:
// // q('#new-todo-form').addEventListener('submit', event => {
// //     event.preventDefault()
// //     const todoTextField = q('#todo-text')
// //     const todoText = todoTextField.value
// //     todoTextField.value = ''
// //     postNewTodo(todoText).then(renderNewTodo)
// //   })

// function postNewNote (titleText, noteText){
//     return fetch('http://localhost:3000/notes/',{
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json'},
//         body: JSON.stringify({note:noteText, title: titleText, note: noteText, done: false, created: moment().format()})
//     })
//     .then(response=>response.json())
// }

// function deleteThisNote (noteId){
//     return fetch('http://localhost:3000/notes/' + noteId,{
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json'},
//         body: JSON.stringify({note:noteId, done: false, created: moment().format()})
//     })
//     .then(response=>response.json())
// }

// function deleteNote(){
//     q('#notes').addEventListener('click', event=>{
//         if (event.target.matches('.delete')){
//             event.target.parentElement.classList.add("noteToDelete")
//             let noteId = (event.target.parentElement.dataset.noteId)
//             deleteThisNote(noteId)
//         }   
//     }
//     )
// }

// function editThisNote (noteId){ //addElement??  <li data-note-id="${note.id}">${note.note}</li>
//     return fetch('http://localhost:3000/notes/' + noteId,{
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json'},
//         body: JSON.stringify({note:"new body text", done: false, edited: moment().format()})
//     })
//     .then(response=>response.json())
// }

// function editNote(){
//     q('#notes').addEventListener('click', event=>{
//         if (event.target.matches('.edit')){
//             event.target.parentElement.classList.add("noteToEdit")
//             let noteId = (event.target.parentElement.dataset.noteId)
//             editThisNote(noteId)
//         }   
//     }
//     )
// }

// getAllNotes().then(createNotesHTML)
// getAllNotes().then(renderNotesList)
// deleteNote()
// editNote()

// console.log("Nothing broken!")