const open_closeSideBar = () => {
  const sidebar = document.querySelector(".sidebar");
  const closeBtn = document.querySelector("#btn");
  const searchBtn = document.querySelector(".bx-search");

  closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
  });

  searchBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
  });

  function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }
};

// active tab
document.addEventListener("DOMContentLoaded", function() {
  const currentLocation = location.href;
  const sidebarLinks = document.querySelectorAll(".nav-list a  ");

  sidebarLinks.forEach(link => {
    if (link.href === currentLocation) {
      link.parentElement.classList.add("active");
    }
  });
});

// const dateTime = () => {
//   const currentDateElement = document.querySelector("#date");
//   const dateTime1 = document.querySelector("#date_of_the_week");
//   const todayDate_time = document.querySelector("#time");
//   const currentDay = document.querySelector("#dayOfWeek");
 
//   // Get the current date
//   const currentDate = new Date();

//   // const weekdays
//   const daysOfWeek = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   // get day of the week by index
//   const dayIndex = currentDate.getDay();
//   // Get the corresponding day name from the array
//   const dayName = daysOfWeek[dayIndex];
//   const formattedDate = currentDate.toLocaleDateString();
//   const formattedTime = currentDate.toLocaleTimeString();

//   currentDateElement.textContent = `Hello,`;
//   currentDay.textContent = `Today is: ${dayName}`;
//   dateTime1.textContent = `Date:  ${formattedDate}`;
//   todayDate_time.textContent = `  Time: ${formattedTime}`;
// };


// // dateTime();
open_closeSideBar();
