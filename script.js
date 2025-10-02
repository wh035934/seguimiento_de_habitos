const habitInput = document.getElementById('habit-Input');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');
const completedCount = document.getElementById('completedCount');
const toggleDarkModeBtn = document.getElementById('toggleDarkMode');

let habits = [];

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

function loadHabits() {
    const stored = localStorage.getItem('habits');
    habits = stored ? JSON.parse(stored) : [];
}

function updateCompletedCount() {
    const completed = habits.filter(h => h.completed).length;
    completedCount.textContent = completed;
}

function renderHabits() {
    habitList.innerHTML = '';
    habits.forEach((habit, idx) => {
        const li = document.createElement('li');
        li.textContent = habit.text;
        li.className = habit.completed ? 'completed' : '';
        li.style.cursor = 'pointer';

        // Toggle completed
        li.addEventListener('click', function() {
            habits[idx].completed = !habits[idx].completed;
            saveHabits();
            renderHabits();
        });

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Eliminar';
        delBtn.className = 'delete-btn';
        delBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            li.classList.add('removing');
            setTimeout(() => {
                habits.splice(idx, 1);
                saveHabits();
                renderHabits();
            }, 300);
        });

        li.appendChild(delBtn);
        habitList.appendChild(li);
    });
    updateCompletedCount();
}

function addHabit() {
    const habitText = habitInput.value.trim();
    if (habitText === '') return;
    habits.push({ text: habitText, completed: false });
    saveHabits();
    renderHabits();
    habitInput.value = '';
    habitInput.focus();
}

addHabitBtn.addEventListener('click', addHabit);
habitInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addHabit();
});

toggleDarkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Guarda preferencia en localStorage
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Al cargar, aplica preferencia
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Inicialización
loadHabits();
renderHabits();