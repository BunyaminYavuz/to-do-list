let listDOM = document.querySelector("#list");
let taskDOM = document.querySelector("#task");
let addButtonDOM = document.querySelector("#liveToastBtn");
let liveToastDOM = document.querySelector("#liveToast");
let trashDOM = document.querySelector("#trash")

function createNewElement(task) {
    const newLi = document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = task;
    newLi.appendChild(taskSpan);

    // const deleteIcon = document.createElement("i");
    // deleteIcon.classList.add("fa-solid", "fa-trash");
    const deleteIcon = document.createElement("div")
    deleteIcon.style.float = "right"
    deleteIcon.textContent = `🗑️`
    deleteIcon.addEventListener("click", function (event) {
        event.preventDefault();
        newLi.remove();
        saveToLocalStorage();
    });

    newLi.appendChild(deleteIcon);

    newLi.addEventListener("click", function () {
        if (!newLi.classList.contains("completed")) {
            newLi.classList.add("completed");
            const completeIcon = document.createElement("div")
            completeIcon.style.float = "right"
            completeIcon.textContent = `✔️`
            newLi.appendChild(completeIcon)
            newLi.style.backgroundColor = "lightgreen";
            taskSpan.style.textDecoration = "line-through"; // Seçili li öğesinin metnini üstü çizili yapar
        } else {
            newLi.classList.remove("completed");
            newLi.style.backgroundColor = "white";
            taskSpan.style.textDecoration = "none"; // Seçili olmayan li öğelerinin metninin üstündeki çizgiyi kaldırır
        }

        saveToLocalStorage();
    });

    return newLi;
}

function newElement(event) {
    event.preventDefault();
    if (taskDOM.value.trim()) {
        const newLi = createNewElement(taskDOM.value.trim());
        listDOM.appendChild(newLi);
        taskDOM.value = "";
        showToastSuccess("Added to the list ✔️");
        saveToLocalStorage();
    } else {
        showToastError("Please enter a valid task !!!");
    }
}

function showToastSuccess(message) {
    liveToastDOM.querySelector(".toast-body").textContent = message;
    let toast = new bootstrap.Toast(liveToastDOM);
    toast.show();
}

function showToastError(message) {
    liveToastDOM.querySelector(".toast-body").textContent = message;
    let toast = new bootstrap.Toast(liveToastDOM);
    toast.show();
}

function saveToLocalStorage() {
    const listItems = Array.from(listDOM.querySelectorAll("li span"));
    const tasks = listItems.map(span => span.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            const newLi = createNewElement(task);
            listDOM.appendChild(newLi);
        });
    }
}

window.addEventListener("load", loadFromLocalStorage);
addButtonDOM.addEventListener("click", newElement);
