//main.js
function view_text() {
  //grab elements from html form
  var textArea = document.getElementById('my_text');
  var output = document.getElementById('view_text');

  //put the text in a var so it cna be manipulated
  var text = textArea.value;

  //pump the text from the textArea to the output div to be displayed
  output.innerHTML = text;
}
