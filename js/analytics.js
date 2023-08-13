document.addEventListener("DOMContentLoaded", () => {
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || [];

    let totalPresent = 0;
    let totalAbsent = 0;
    attendanceData.forEach(entry => {
        totalPresent += entry.present;
        totalAbsent += entry.absent;
    });

    console.log(totalAbsent)
    console.log(totalPresent)

    const analyticsDateElement = document.querySelector("#analyticsDate");
    const analyticsPresentElement = document.querySelector("#analyticsPresent");
    const analyticsAbsentElement = document.querySelector("#analyticsAbsent");

    const lastEntry = attendanceData.length > 0 ? attendanceData[attendanceData.length - 1] : null;

    if (lastEntry) {
        analyticsDateElement.textContent = lastEntry.date;
        analyticsPresentElement.textContent = totalPresent;
        analyticsAbsentElement.textContent = totalAbsent;
    }
});
