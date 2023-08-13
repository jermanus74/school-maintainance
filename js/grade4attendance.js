document.addEventListener("DOMContentLoaded", () => {
    const formOnestudents = JSON.parse(localStorage.getItem("studentData")) || [];
    const gradeOne = formOnestudents.filter(student => student.hasOwnProperty("grade") && student.grade == 4);

    const table = document.querySelector("#table");
    const tbody = table.querySelector("tbody");

    gradeOne.forEach(student => {
        const currentDate = new Date();

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDay = daysOfWeek[currentDate.getDay()];

        const today = document.querySelector(".currentDay");
        today.textContent = currentDay;

        const row = document.createElement("tr");

        const studentNameCell = document.createElement("td");
        studentNameCell.className = "name";
        studentNameCell.textContent = student.fullName;
        row.appendChild(studentNameCell);

        const attendanceCell = document.createElement("td");
        attendanceCell.className = "check";

        const presentDiv = document.createElement("div");
        presentDiv.className = "presentStudents";
        const presentCheckbox = document.createElement("select");

        const presentOption1 = document.createElement("option");
        presentOption1.textContent = "Present";

        const presentOption2 = document.createElement("option");
        presentOption2.textContent = "Absent";

        presentCheckbox.appendChild(presentOption1);
        presentCheckbox.appendChild(presentOption2);

        attendanceCell.appendChild(presentDiv);
        attendanceCell.appendChild(presentCheckbox);


        row.appendChild(attendanceCell);
        tbody.appendChild(row);
    });

    const currentDate = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const dateElement = document.querySelector("#date");
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const table2 = document.querySelector('#table2');
    
    dateElement.textContent = currentDate.toLocaleDateString(undefined, options);
    
    function createTableRow() {
        const currentDate = new Date();
        const currentDay = daysOfWeek[currentDate.getDay()];

        const tbodyContent = `
            <tbody>
                <tr>
                    <td class="day">${currentDay}</td>
                    <td class="currentDate">${currentDate.toLocaleDateString(undefined, options)}</td>
                    <td class="present"><div id="present"></div></td>
                    <td class="absent"> <div id="absent"></div></td>
                </tr>
            </tbody>
        `;

        table2.insertAdjacentHTML('beforeend', tbodyContent);
    }
    createTableRow();

    function clearTableAtEndOfMonth() {
        var today = new Date();
        var currentDate = today.getDate();
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        if (currentDate == lastDayOfMonth) {
            var table2 = document.getElementById('table2');
            var tbody = table2.querySelector('tbody');
            tbody.innerHTML = '';
        }
    }

    clearTableAtEndOfMonth();

    setInterval(clearTableAtEndOfMonth, 24 * 60 * 60 * 1000);
    function calculateTotalOptions() {
        const presentOptions = document.querySelectorAll(".check select option:checked");
        let presentCount = 0;
        let absentCount = 0;

        presentOptions.forEach(option => {
            if (option.textContent == "Present") {
                presentCount++;
            } else if (option.textContent == "Absent") {
                absentCount++
               presentCount-1
            }
        });

        const totalPresentElement = document.querySelector("#present");
        const totalAbsentElement = document.querySelector("#absent");

        totalPresentElement.textContent = presentCount;
        totalAbsentElement.textContent = absentCount;
        const attendanceData = {
            date: currentDate.toLocaleDateString(undefined, options),
            present: presentCount,
            absent: absentCount
        };
        const storedData = JSON.parse(localStorage.getItem('attendanceData')) || [];
        storedData.push(attendanceData);
        localStorage.setItem('attendanceData', JSON.stringify(storedData));
    }
  
    document.addEventListener("change", calculateTotalOptions);

     
    const submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", () => {
        if (submitButton.onclick) {
            submitButton.disabled = true;
            submitButton.style.visibility = "hidden"; 
        }

        window.location.href = "analytic.html";
    });
});



