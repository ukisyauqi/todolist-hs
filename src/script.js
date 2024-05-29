let todos = [];
const todoComponents = document.getElementById("todoComponents");

window.onload = function () {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    renderTodos(todos);
  }
};

document.getElementById("formTodo").addEventListener("submit", function (e) {
  e.preventDefault();

  const content = document.getElementById("content").value;
  const priority = document.getElementById("priority").value;
  const today = new Date();

  todos.unshift({
    checked: false,
    priority,
    content,
    timestamp: convertDayAndDate(today),
  });

  renderTodos(todos);
});

function renderTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  todoComponents.innerHTML = "";
  todos.map((todo, i) => {
    isOverdue(todo.timestamp);
    todoComponents.innerHTML += `
      <div class="flex items-center gap-4 p-4 border-t group">
        <input type="checkbox" class="size-6 accent-purple-500" ${
          todo.checked && "checked"
        } onclick="toggleChecked(${i})"/>
        <p type="text" ${
          todo.checked && 'style="text-decoration: line-through"'
        }>${todo.content}</p>
        <div class="flex-1"></div>
        <p class="text-sm text-gray-400">${todo.priority} ${todo.timestamp}</p>
        <button
          type="submit"
          class="cursor-pointer invisible group-hover:visible font-bold"
          onclick="deleteTodo(${i})"
        >
          ╳
        </button>
      </div>
    `;
  });
}

function isOverdue(date) {
  const now = new Date();
  console.log(now);
  return date < now;
}

function deleteTodo(i) {
  todos.splice(i, 1);
  renderTodos(todos);
}

function toggleChecked(i) {
  console.log("toggleChecked");
  todos[i].checked = !todos[i].checked;
  renderTodos(todos);
}

function convertDayAndDate(date) {
  return `${
    ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][
      date.getDay()
    ]
  }, ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

function deleteAllTodos() {
  todos = [];
  renderTodos(todos);
}

const btns = document.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("text-black");
    current[0].className = current[0].className.replace(" text-black", "");
    this.className += " text-black";
  });
}

function showAllTodos() {
  renderTodos(todos);
}

function showCompletedTodos() {
  const completedTodos = todos.filter((todo) => todo.checked);
  renderTodos(completedTodos);
}
