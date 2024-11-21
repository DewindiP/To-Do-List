const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const container = document.querySelector('.container');
const themes = [
    'linear-gradient(to right, #38ef7d, #1a7676)',
    'linear-gradient(to right, #9a8537, #e0ea1a)',
    'linear-gradient(to right, #c75075, #682563)',
    'linear-gradient(to right, #8e2de2, #4a00e0)',
    'linear-gradient(to right, #00c6ff, #393b88)',
];
let currentTheme = 0;

document.querySelector('.label-theme').addEventListener('click', () => {
    currentTheme = (currentTheme + 1) % themes.length;
    container.style.background = themes[currentTheme];
});

function addTask() {
    if(inputBox.value ==='') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

document.querySelectorAll('.filter').forEach(filter => {
    filter.addEventListener('click', function() {
        const filterType = this.dataset.filter;
        filterTasks(filterType);
    });
});

// Function to filter tasks
function filterTasks(filterType) {
    const tasks = document.querySelectorAll('#list-container li');
    tasks.forEach(task => {
        if (filterType === 'completed' && !task.classList.contains('checked')) {
            task.style.display = 'none';
        } else if (filterType === 'pending' && task.classList.contains('checked')) {
            task.style.display = 'none';
        } else {
            task.style.display = '';
        }
    });
}

// Event listener for "Delete All" button
document.querySelector('.delete-all').addEventListener('click', function() {
    document.getElementById('list-container').innerHTML = '';
    saveData();
});



