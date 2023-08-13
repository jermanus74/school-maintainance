const populateTableWithData = () => {
    const table = document.querySelector("table");
  
    const storedData = JSON.parse(localStorage.getItem("studentData")) || [];
    const sortedData = storedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort data by timestamp
  
    // Clear existing table rows
    table.innerHTML = "";
  
    // Display only the four most recent rows
    for (let i = 0; i < Math.min(4, sortedData.length); i++) {
      const data = sortedData[i];
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td class="name">${data.fullName}</td>
        <td class="class">${data.grade}</td>
        <td class="parent">${data.guardianName}</td>
        <td class="gender">${data.gender}</td>
        <td class="phone_no">${data.phone}</td>
      `;
  
      if (!hasDuplicateData(newRow, table)) {
        table.appendChild(newRow);
      } else {
        console.log("duplicate found!!");
      }
    }
  };
  const hasDuplicateData = (newRow, table) => {
    const newRowCells = newRow.querySelectorAll("td");
  
    for (const row of table.querySelectorAll("tr")) {
      const rowCells = row.querySelectorAll("td");
      let isDuplicate = true;
  
      if (newRowCells.length === rowCells.length) {
        for (let i = 0; i < newRowCells.length; i++) {
          if (newRowCells[i].textContent !== rowCells[i].textContent) {
            isDuplicate = false;
            break;
          }
        }
      } else {
        isDuplicate = false;
      }
  
      if (isDuplicate) {
        return true;
      }
    }
  
    return false;
  };
  
  const saveDataToLocalStorage = (data) => {
    const storedData = JSON.parse(localStorage.getItem("studentData")) || [];
    storedData.push(data);
    localStorage.setItem("studentData", JSON.stringify(storedData));
  };
  