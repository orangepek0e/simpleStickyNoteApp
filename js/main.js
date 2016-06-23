//main.js
var notes, count = 0;

//clicking the save button will send the note to localStorage
function saveNotes() {
  var notesArray = [];

  //for each of the notes, add a note object to the Array
  notes.find("li > div").each(function(i, e){
    //save the attributes of the div, as well as the note [title, content, etc]
    var colorClass = $(e).attr("class");
    var title = $(e).find("textArea.noteTitle");
    var content = $(e).find("textArea.noteContent");

    notesArray.push({ Index: i, Title: title.val(), Content: content.val(), Class: colourClass });

  });

  //encode it in JSON
  var noteString = JSON.stringify(notesArray);
  //then save to localStorage to be retrieved later
  localStorage.setItem("notes", noteString);
  console.log("Item",noteString,"has been saved to localStorage!");

}

function addNoteEvent(noteElement) {
  var div = noteElement.children("div");
  var closeImg = div.find("img");

  div.focus(function(){
    closeImg.removeClass("hide");
  });

  div.children().focus(function(){
    closeImg.removeClass("hide");
  });

  div.hover(function () {
      closeImg.removeClass("hide");
  }, function () {
      closeImg.addClass("hide");
      saveNotes();
  });

  div.children().hover(function () {
      closeImg.removeClass("hide");
  }, function () {
      closeImg.addClass("hide");
  });

}

//  adds a new note to the 'notes' list
function addNewNote(className, title, content) {
	// if class is not specified, use a random colour class
	if (!className) {
		className = "color" + Math.ceil(Math.random() * 3);
	}

	// add a new note to the end of the list
	notes.append("<li><div class='" + className + "'>" +
					"<textarea class='note-title' placeholder='Enter a title here!' maxlength='22'/>" +
					"<textarea class='note-content' placeholder='Forgetting something?'/>" +
					"<img class='hide' src='../images/deleteStickyNote.svg'/>" +
					"</div></li>");

	// get the new note that's just been added and attach the click event handler to its close button
	var newNote = notes.find("li:last");
	newNote.find("img").click(function () {
        // remove the note and save
	    newNote.remove();
	    saveNotes();
	});

	// hook up event handlers to show/hide close button as appropriate
	addNoteEvent(newNote);

	// if a title is provided then set the title of the new note
	if (title) {
		// get the title textarea element and set its value
		newNote.find("textarea.note-title").val(title);
    }
	// if a content is provided then set the content of the new note
	if (content) {
		// get the content textarea element and set its value
		newNote.find("textarea.note-content").val(content);
    }
    // save
    saveNotes();
}

function loadNotes() {
  //load notes from local storage if any are available
  var storedNotes = localStorage.getItem("notes");
  if(storedNotes){
    //pass the stored JSON back into an array of note objects
    var notesArray = JSON.parse(storedNotes);
    count = notesArray.length;

    for(var i = 0; i < count; i++){
      var storedNote = notesArray[i];

      addNewNote(storedNote.Class, storedNote.Title, storedNote.Content);
    }
  }
}

$(document).ready(function(){
  //retrieve reference to 'notes' list
  notes = $("#notes");
  //load notes from localStorage
  loadNotes();

  //clicking the 'newNoteButton' adds a new note to the list
  $("#newNoteButton").click(function () {
      addNewNote();
  });

  //add a note the the list if there aren't any
  if(count === 0){
    $("#newNoteButton").click();
  }

});
