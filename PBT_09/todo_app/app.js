const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const filters = document.getElementById("filters");
const clearCompleted = document.getElementById("clearCompleted");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateCount() {
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} items left`;
}

function renderTodos() {
    todoList.innerHTML = "";
    
    let filteredTodos = todos;
    if (currentFilter === "active") filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === "completed") filteredTodos = todos.filter(t => t.completed);

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? "completed" : ""}`;
        li.dataset.id = todo.id;

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;

        const btn = document.createElement("button");
        btn.className = "delete-btn";
        btn.textContent = "❌";

        li.appendChild(span);
        li.appendChild(btn);
        todoList.appendChild(li);
    });

    updateCount();
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    todos.push({ id: Date.now().toString(), text, completed: false });
    todoInput.value = "";
    saveTodos();
    renderTodos();
});

todoList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const id = li.dataset.id;

    if (e.target.classList.contains("delete-btn")) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        renderTodos();
    } else if (e.target.classList.contains("todo-text")) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            
            li.classList.toggle("completed"); 
            saveTodos();
            updateCount();
            
            if (currentFilter !== "all") {
                renderTodos();
            }
        }
    }
});

todoList.addEventListener("dblclick", (e) => {
    if (!e.target.classList.contains("todo-text")) return;
    
    const li = e.target.closest("li");
    const id = li.dataset.id;
    const todo = todos.find(t => t.id === id);
    
    const input = document.createElement("input");
    input.type = "text";
    input.className = "edit-input";
    input.value = todo.text;
    
    li.replaceChild(input, e.target);
    input.focus();

    let isEditing = true;

    const finishEdit = () => {
        if (!isEditing) return;
        isEditing = false;

        const newText = input.value.trim();
        if (newText) {
            todo.text = newText;
        } else {
            todos = todos.filter(t => t.id !== id);
        }
        saveTodos();
        renderTodos();
    };

    input.addEventListener("blur", finishEdit);
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") finishEdit();
        if (event.key === "Escape") {
            isEditing = false;
            renderTodos(); 
        }
    });
});

filters.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;
    
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
    
    currentFilter = e.target.dataset.filter;
    renderTodos();
});

clearCompleted.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
});

renderTodos();