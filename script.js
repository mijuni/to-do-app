// Variablen setzen um zugreifen zu können
const btnElement = document.querySelector("#add-button");
const newTodoInputElement = document.querySelector("#new-todo");
const todoListElement = document.querySelector("#list");
const formElement = document.querySelector("form");

// mit Enter Eingabe neues Todo hinzuzufügen mithilfe von form und submit
formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  addNewTodo();
});

function addNewTodo() {
  // TODO Nur Todo erzeugen wenn Textfeld nicht leer
  if (newTodoInputElement.value.length >= 5) {
    // checkbox Element erzeugen
    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";

    // li Element erzeugen
    const liElement = document.createElement("li");

    // checkbox Element li hinzufügen
    liElement.appendChild(checkboxElement);

    // li Element new todo input text zuweisen
    const textNode = document.createTextNode(newTodoInputElement.value);
    liElement.appendChild(textNode);
    newTodoInputElement.value = "";

    checkboxElement.addEventListener("change", () => {
      liElement.classList.toggle("is-done");
    });

    // li element render / dem ul zuweisen
    todoListElement.appendChild(liElement);
  } else {
    alert(
      "Sorry ich konnte das Todo nicht hinzufügen, es muss mindestens 2 Zeichen beinhalten."
    );
  }
}

//Filter function
// Variablen setzen für einzelne input Felder
const showAll = document.querySelector("#show-all");
const showOpen = document.querySelector("#show-open");
const showDone = document.querySelector("#show-done");

// Filter function - show list element for each state(all, open, done)
function showListElement() {
  todoListElement.classList.remove("show-open");
  todoListElement.classList.remove("show-done");
  if (showOpen.checked === true) {
    //add class .show-open --> ul
    todoListElement.classList.add("show-open");
  } else if (showDone.checked === true) {
    todoListElement.classList.add("show-done");
  }

  // Filter function Alternative - mit for Schleife
  /*  for (let item of document.querySelectorAll("ul li")) {
       if (allOpen.checked === true) {
         item.classList.remove("out-of-filter");
       } else if (openTodos.checked === true) {
         if (item.classList.contains("is-done")) {
           item.classList.add("out-of-filter");
         } else {
           item.classList.remove("out-of-filter");
         }
       } else if (doneTodos.checked === true) {
         if (!item.classList.contains("is-done")) {
           item.classList.add("out-of-filter");
         } else {
           item.classList.remove("out-of-filter");
         }
    }*/
}

showAll.addEventListener("change", showListElement);
showOpen.addEventListener("change", showListElement);
showDone.addEventListener("change", showListElement);

// Lösche done Todos mit Button
const deleteDone = document.querySelector("#delete-all-done");

deleteDone.addEventListener("click", function () {
  const doneListElements = document.querySelectorAll("li.is-done");
  doneListElements.forEach((doneTodo) => {
    doneTodo.remove();
  });
});
