// Mengambil elemen HTML
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const warning = document.getElementById("warning");

const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const pendingTasks = document.getElementById("pending-tasks");

// Menyimpan data tugas
let tasks = [];

// Fungsi menambahkan tugas
todoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskValue = todoInput.value.trim();

    // Validasi input kosong
    if (taskValue === "") {
        warning.textContent = "⚠️ Silakan masukkan tugas terlebih dahulu!";
        todoInput.focus();
        return;
    }

    warning.textContent = "";

    // Membuat objek tugas baru
    const newTask = {
        id: Date.now(),
        text: taskValue,
        completed: false
    };

    tasks.push(newTask);

    // Memperbarui tampilan
    renderTasks();

    // Mengosongkan input
    todoInput.value = "";
    todoInput.focus();
});

// Fungsi menampilkan tugas
function renderTasks() {
    todoList.innerHTML = "";

    tasks.forEach(function(task) {

        // Membuat elemen list
        const li = document.createElement("li");
        li.className = "todo-item";

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        // Teks tugas
        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.text;

        // Jika tugas selesai
        if (task.completed) {
            taskText.classList.add("completed");
        }

        // Event untuk menandai selesai
        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;
            renderTasks();
        });

        // Tombol hapus
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "×";
        deleteButton.setAttribute("aria-label", "Hapus tugas");

        // Event menghapus tugas
        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            renderTasks();
        });

        // Memasukkan elemen ke dalam list
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    });

    // Memperbarui statistik
    updateStatistics();
}

// Fungsi statistik otomatis
function updateStatistics() {
    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}

// Menampilkan statistik awal
updateStatistics();