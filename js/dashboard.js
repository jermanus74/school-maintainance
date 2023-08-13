const dashboard = () => {
    const openCounter = () => {
        const number = document.querySelector("#counter");
        // const number1 = document.querySelector("#counter1");
        let counter = 0;
        setInterval(() => {
            if (counter == 70) {
                clearInterval();
            } else {
                counter++;
                number.innerText = counter + "%";
                //   number1.innerText = counter + "%";
            }
        }, 58);
    };
// localStorage.clear()
    const getTotalNumberOfStoredData = () => {
        const storedData = JSON.parse(localStorage.getItem("studentData")) || [];
        return storedData.length;
      };
      
      const details = () => {
        const datas = getTotalNumberOfStoredData();
        const studentDetail = document.getElementById("studentDetail");
      
        if (datas > 1) {
          studentDetail.innerText = "Students";
        } else {
          studentDetail.innerText = "Student";
        }
      };
      
      document.addEventListener("DOMContentLoaded", () => {
        details();
      });
      
    openCounter();

    document.addEventListener("DOMContentLoaded", () => {
        const totalStoredData = getTotalNumberOfStoredData();
        const totalStudent = document.querySelector("#totalStudent")
        const totalStudents=document.querySelector("#total")
        totalStudent.textContent = totalStoredData;
        totalStudents.textContent = ` ${totalStoredData} `;
        if (totalStoredData > 1) {
          totalStudents.innerText += " Students.";
        } else {
          totalStudents.innerText += " Student.";
        }
        details()
    });

    document.addEventListener("DOMContentLoaded", () => {
        details();

    });
}
dashboard();