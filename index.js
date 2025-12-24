

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

SubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const bangla = parseFloat(Bangla.value);
    const english = parseFloat(English.value);
    const math = parseFloat(Math.value);
    const science = parseFloat(Science.value);
    const gs = parseFloat(GS.value);
    const religion = parseFloat(Religion.value);
    const ict = parseFloat(ICT.value);

    const total = bangla + english + math + science + gs + religion + ict;
    const average = total / 7;


    let grade;
    if (average >= 80) grade = 'A+';
    else if (average >= 70) grade = 'A';
    else if (average >= 60) grade = 'B';
    else if (average >= 50) grade = 'C';
    else grade = 'D';

    const passFail = (bangla >= 33 && english >= 33 && math >= 33 && science >= 33 && gs >= 33 && religion >= 33 && ict >= 33) ? 'Pass' : 'Fail';

    let table = document.querySelector('#resultTable');

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
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        document.querySelector('.data-box').appendChild(table);
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${Name.value}</td>
        <td>${Roll.value}</td>
        <td>${total}</td>
        <td>${average.toFixed(2)}</td>
        <td>${grade}</td>
        <td style="color: ${passFail === 'Pass' ? 'green' : 'red'}">${passFail}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    table.querySelector('tbody').appendChild(tr);

    tr.querySelector('.delete-btn').addEventListener('click', () => {
        tr.remove();

    });

    document.getElementById('studentForm').reset();
});

document.getElementById("currentYear").textContent = new Date().getFullYear();