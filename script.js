const newTodoInputElement = document.querySelector("#new-todo");
const btnElement = document.querySelector("#btn-new-todo");
const formElement = document.querySelector("form");
const todoListElement = document.querySelector("#todo-list");
let stateArr = [];

//Daten aus local storage laden
stateArr = JSON.parse(localStorage.getItem("stateArr"));
// console.log(stateArr);

//aus stateArr Liste erzeugen
if (stateArr !== null) {
  stateArr.forEach((item) => {
    createListElement(item);
  });
}

//1. li Elemente mit "Add" hinzufügen + in stateArr --> local Storage speichern
//Textfeld lässt sich mit Enter bestätigen
formElement.addEventListener("submit", function (event) {
  //Verhindern vom automatischem reload der Seite
  //   event.preventDefault();
  addNewTodo();
});

function addNewTodo() {
  if (stateArr === null) {
    stateArr = [];
  }

  // TODO Nur Todo erzeugen wenn Textfeld nicht leer
  if (newTodoInputElement.value.length >= 5) {
    newTodo = {
      todo: newTodoInputElement.value,
      done: false,
      id: createId(newTodoInputElement.value),
    };

    stateArr.push(newTodo);
    save();
    createListElement(newTodo);
  } else {
    alert(
      "Sorry ich konnte das Todo nicht hinzufügen, es muss mindestens 5 Zeichen beinhalten."
    );
  }
}

function createId(text) {
  return (
    text.toLowerCase().replaceAll(" ", "") + Math.floor(Math.random() * 100000)
  );
}

function save() {
  localStorage.setItem("stateArr", JSON.stringify(stateArr));
}

function createListElement(item) {
  // checkbox Element erzeugen
  const checkboxElement = document.createElement("input");
  checkboxElement.type = "checkbox";
  checkboxElement.id = item.id;

  // li Element erzeugen
  const liElement = document.createElement("li");

  // checkbox Element li hinzufügen
  liElement.appendChild(checkboxElement);

  const textNode = document.createTextNode(item.todo);
  liElement.appendChild(textNode);

  // li element render / dem ul zuweisen
  todoListElement.appendChild(liElement);

  checkboxElement.addEventListener("change", changeDoneState);
}

function changeDoneState(event) {
  //Wenn checkbox angesprochen wird, soll gesamtes li angesprochen werden
  const liElement = event.target.parentNode;
  // Class fürs style( durchgestrichen) wird auf das li angewandt
  liElement.classList.toggle("is-done");
  // id der checkbox wird in const abgespeichert
  const id = event.target.id;
  // console.log(event.target.id);

  // id der checkbox wird mit id des stateArr abgeglichen, dort wo true wird der value von done getauscht (true/false-Wechsel)
  let currentTodo = stateArr.find((element) => element.id === id);
  currentTodo.done = !currentTodo.done;

  save();
  // console.log(currentTodo);
  console.log(stateArr);
}

// lösche done's
const deleteDone = document.querySelector("#delete-all-done");

deleteDone.addEventListener("click", function () {
  const doneListElements = document.querySelectorAll("li.is-done");
  doneListElements.forEach((doneTodo) => {
    doneTodo.remove();
  });
  //stateArr liElement entfernen mit filter
  stateArr = stateArr.filter((todo) => !todo.done);
  save();
  console.log(stateArr);
});

const allOpen = document.querySelector("#all-todos");
const openTodos = document.querySelector("#open-todos");
const doneTodos = document.querySelector("#done-todos");

allOpen.addEventListener("change", showListElement);
openTodos.addEventListener("change", showListElement);
doneTodos.addEventListener("change", showListElement);

function showListElement() {
  //filtern mit CSS
  todoListElement.classList.remove("show-open");
  todoListElement.classList.remove("show-done");
  if (openTodos.checked === true) {
    //add class .show-open --> ul
    todoListElement.classList.add("show-open");
  } else if (doneTodos.checked === true) {
    todoListElement.classList.add("show-done");
  }

  // filtern mit for-Schleife
  //   for (let item of document.querySelectorAll("ul li")) {
  //     if (allOpen.checked === true) {
  //       item.classList.remove("out-of-filter");
  //     } else if (openTodos.checked === true) {
  //       if (item.classList.contains("is-done")) {
  //         item.classList.add("out-of-filter");
  //       } else {
  //         item.classList.remove("out-of-filter");
  //       }
  //     } else if (doneTodos.checked === true) {
  //       if (!item.classList.contains("is-done")) {
  //         item.classList.add("out-of-filter");
  //       } else {
  //         item.classList.remove("out-of-filter");
  //       }
  //     }
  //   }
}
