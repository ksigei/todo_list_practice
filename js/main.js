let todoItems = [
  //dummy list
  // {
  //     name: read,
  //     checked: false,
  //     id: Date.now(),
  // },  {
  //     name: swimming,
  //     checked: false,
  //     id: Date.now(),
  // }
];

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}

const form = document.querySelector(".todo_form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.querySelector(".todo_input");

  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});

function renderTodo(todo) {
  const list = document.querySelector(".todo_list");

  const isChecked = todo.checked ? "done" : "";

  const node = document.createElement("li");

  node.setAttribute("class", `todo_item ${isChecked}`);

  node.setAttribute("data-key", todo.id);

  node.innerHTML = `
  <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  list.append(node);
}

const list = document.querySelector("todo_list");

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo_tick")) {
    const itemKey = e.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
});

function toggleDone(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}
