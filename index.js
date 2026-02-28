

const Name = document.getElementById('name')
const Roll = document.getElementById('roll')
const Bangla = document.getElementById('bangla')
const English = document.getElementById('english')
const Math = document.getElementById('math')
const Science = document.getElementById('science')
const GS = document.getElementById('gs')
const Religion = document.getElementById('religion')
const ICT = document.getElementById('ict')
const SubmitBtn = document.getElementById('submit-btn')
const ClearBtn = document.getElementById('clear-btn')
const PrintBtn = document.getElementById('print-btn')
const DataBox = document.querySelector('.data-box')

// Load data from LocalStorage on startup
let students = JSON.parse(localStorage.getItem('students')) || [];

ClearBtn.addEventListener('click', () => {
    document.getElementById('studentForm').reset();
});

PrintBtn.addEventListener('click', () => {
    if (students.length === 0) {
        alert("No results to print!");
        return;
    }
    window.print();
});

SubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const nameValue = Name.value.trim();
    const rollValue = Roll.value.trim();
    if (!nameValue || !rollValue) {
        alert("Please enter both Student Name and Roll Number.");
        return;
    }

    const bangla = parseFloat(Bangla.value);
    const english = parseFloat(English.value);
    const math = parseFloat(Math.value);
    const science = parseFloat(Science.value);
    const gs = parseFloat(GS.value);
    const religion = parseFloat(Religion.value);
    const ict = parseFloat(ICT.value);

    if (isNaN(bangla) || isNaN(english) || isNaN(math) || isNaN(science) || isNaN(gs) || isNaN(religion) || isNaN(ict)) {
        alert("Please enter valid marks for all subjects.");
        return;
    }

    const total = bangla + english + math + science + gs + religion + ict;
    const average = total / 7;

    const passFail = (bangla >= 33 && english >= 33 && math >= 33 && science >= 33 && gs >= 33 && religion >= 33 && ict >= 33) ? 'Pass' : 'Fail';

    let grade;
    if (passFail === 'Fail') {
        grade = 'F';
    } else if (average >= 80) {
        grade = 'A+';
    }
    else if (average >= 70) grade = 'A';
    else if (average >= 60) grade = 'B';
    else if (average >= 50) grade = 'C';
    else grade = 'D';

    // Create Student Object
    const student = {
        id: Date.now(), // Unique ID
        name: nameValue,
        roll: rollValue,
        total: total,
        average: average.toFixed(2),
        grade: grade,
        passFail: passFail
    };

    // Add to array and save to LocalStorage
    students.push(student);
    saveAndRender();
    document.getElementById('studentForm').reset();
});

// Function to Save and Render Table
function saveAndRender() {
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
}

// Function to Render Table
function renderTable() {
    let table = document.querySelector('#resultTable');

    // If no students, remove table if exists
    if (students.length === 0) {
        if (table) table.remove();
        return;
    }

    if (!table) {
        table = document.createElement('table');
        table.id = 'resultTable';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Roll Number</th>
                    <th>Total Marks</th>
                    <th>Average Marks</th>
                    <th>Grade</th>
                    <th>Result</th>
                    <th class="no-print">Action</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        DataBox.appendChild(table);
    }

    const tbody = table.querySelector('tbody');
    tbody.innerHTML = ''; // Clear current rows

    students.forEach((student, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.total}</td>
            <td>${student.average}</td>
            <td>${student.grade}</td>
            <td><span class="status-badge ${student.passFail.toLowerCase()}">${student.passFail}</span></td>
            <td class="no-print"><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Global function to delete student
window.deleteStudent = (index) => {
    if (confirm("Are you sure you want to delete this result?")) {
        students.splice(index, 1);
        saveAndRender();
    }
};

// Initial Render on Page Load
renderTable();

document.getElementById("currentYear").textContent = new Date().getFullYear();