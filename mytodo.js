var todoInput = document.getElementById("todoInput"); 
var addButton = document.getElementsByTagName("button")[0]; 
var todoList = document.getElementById("todoList"); 
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); 


var createNewTaskElement = function (taskString) {

  var listItem = document.createElement("li");

  var checkBox = document.createElement("input");

  var label = document.createElement("label");

  var PROGInput = document.createElement("input");

  var PROGButton = document.createElement("button");

  var XButton = document.createElement("button");

  XButton.innerText = "X";
  XButton.className = "X";

 

  PROGButton.innerText = "PROG";
  PROGButton.className = "PROG";
  checkBox.type = "checkbox";
  PROGInput.type = "text";
 
  label.innerText = taskString;


  listItem.appendChild(label);
  listItem.appendChild(PROGInput);
  listItem.appendChild(XButton);
  listItem.appendChild(PROGButton);

  listItem.appendChild(checkBox);

  return listItem;
}

var addTask = function () {
  console.log("Add task...");

  var listItem = createNewTaskElement(todoInput.value);

  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  todoInput.value = "";
}


var PROGTask = function () {
  console.log("PROG task...");

  var listItem = this.parentNode;

  var PROGInput = listItem.querySelector("input[type=text");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("PROGMode");


  if (containsClass) {

    label.innerText = PROGInput.value;
  } else {

    PROGInput.value = label.innerText;
  }


  listItem.classList.toggle("PROGMode");

}


var XTask = function () {
  console.log("X task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
}

var taskCompleted = function () {
  console.log("Task complete...");

  var listItem = this.parentNode;
  todoList.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function () {
  console.log("Task incomplete...");

  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");

  
  var XButton = taskListItem.querySelector("button.X");
  var PROGButton = taskListItem.querySelector("button.PROG");
  var checkBox = taskListItem.querySelector("input[type=checkbox]");


  PROGButton.onclick = PROGTask;

  XButton.onclick = XTask;

  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function () {
  console.log("AJAX request");
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {

  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < todoList.children.length; i++) {

  bindTaskEvents(todoList.children[i], taskIncomplete);
}