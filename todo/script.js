let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        // checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.onchange = () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        };

        // text
        let span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.6";
        }

        // delete button
        let btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.className = "delete-btn";
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.onclick = () => {
            let newText = prompt("Edit task:", task.text);

            if (newText !== null && newText.trim() !== "") {
                tasks[index].text = newText.trim();
                saveTasks();
                renderTasks();
            }
        };

        btn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(btn);

        list.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    let value = input.value.trim();

    if (value === "") return;

    tasks.push({
        text: value,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
}

renderTasks();

// Enter bosilganda task qo‘shish
document.getElementById("taskInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});