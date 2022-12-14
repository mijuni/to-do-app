// state verwalten/repräsentieren als JavaScript
/* in einem Array(filterOptions) die Zustände/states festlegen z.B.: "all", "done", "open"*/
/* in einem Object(todoAppState) den state darstellen/modellieren z.B.: filter: "all" -> 
genestetes Object -> todos: einzelne Todos aufzählen und mit einer description und dem state("done") */
/* aus JS State modellieren und verwalten -> im DOM visualisieren -> z.B.: document.querySelector(...), document.createElement(...) etc. */
/* Synch mit User Eingabe und JS State (State muss synchron sein) z.B.: User klickt und state muss sich dann aktualisieren */

// Herangehensweise
/* Identifizieren des States: welche states gibt es? */
/* Requirements definieren */
/* Visualize state (Entitiy Relationship Model) */

/* connect to DOM - DOM Elemente (Javascript Elemente) um Eiegenschaften erweitern mit Attribute (data-...) oder Properties ranhängen */
/* mit Eventhandler herausfinden wo ist es passiert, um dann state zu aktualisieren */

const btnElement = document.querySelector("#add-button");
const newTodoInputElement = document.querySelector("#new-todo");
const todoListElement = document.querySelector("#list");

function addNewTodo() {
  console.log("Click");

  // TODO Nur Todo erzeugen wenn Textfeld nicht leer
  if (newTodoInputElement.value.length >= 2) {
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

btnElement.addEventListener("click", addNewTodo);

// Variablen setzen für einzelne input Felder
const showAll = document.querySelector("#show-all");
const showOpen = document.querySelector("#show-open");
const showDone = document.querySelector("#show-done");

// li element ansprechen
/* li element Klasse vergeben oder direkt ansprechen mit querySelector ?*/

// show list element for each state(all, open, done)
function showListElement() {
  if (showAll.checked === true) {
    // show all li, append
    //todoListElement.appendchild("li")
  } else if (showOpen.checked === true) {
    // show open li, append
  } else if (showDone.checked === true) {
    // show done li, append
  }
}

// each todo has a description and a done property
/*
const state = {
  todos: [
    // Beispiel {description: "...", done: true/ false },
    { description: "Learn HTML", done: true },
    { description: "Learn CSS", done: true },
    { description: "Learn JavaScript", done: false },
  ],
};

// function renderToDos mithilfe von <ul> list Element

function renderTodos() {
  const list = document.querySelector("#list");
  // list element Text leeren by default
  list.innerHTML = "";

  // in jedes Todo mit .forEach
  state.todos.forEach((todo) => {
    //neues li Element kreieren
    const todoLi = document.createElement("li");

    // Type Checkbox einfügen und state als todo hinzufügen
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    // Checkbox in DOm einfügen
    todoLi.appendchild(checkbox);

    // Text einfügen
    const todoText = document.createTextNode(todo.description);
    todoLi.append(todoText);

    // Liste einfügen
    list.appendchild(todoLi);
  });
}

//Function initial aufrufen
renderTodos();*/
