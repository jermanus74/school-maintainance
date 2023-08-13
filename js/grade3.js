document.addEventListener("DOMContentLoaded", () => {
    const students = JSON.parse(localStorage.getItem("studentData")) || [];
    const gradeOneStudents = students.filter(student => {
      return student.hasOwnProperty("grade") && student.grade == 3;
    });
    const table=document.querySelector("table")
  gradeOneStudents.forEach(student => {
    const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td class="name">${student.fullName}</td>
        <td class="class">${student.grade}</td>
        <td class="parent">${student.guardianName}</td>
        <td class="gender">${student.gender}</td>
        <td class="phone_no">${student.phone}</td>
      `;
      table.appendChild(newRow);
  });
  const studentCount = gradeOneStudents.length;
  const formOne_students=document.querySelector("#totalForm3")
 formOne_students.textContent=studentCount;
 const formOneDetails=document.querySelector("#formThreeDetails")
 if (studentCount>1) {
  formOneDetails.innerText="Students"
 }
 else{
  formOneDetails.innerText="Student"

 }
  });
  