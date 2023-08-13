document.addEventListener("DOMContentLoaded", () => {
  const age = document.querySelector("input#age");
  const birthYear = document.querySelector("input#date-of-birth");
  const form = document.querySelector("form");

  const calculateAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const currentAge = () => {
    const birthYearValue = parseInt(birthYear.value);
    if (!isNaN(birthYearValue)) {
      const ageValue = calculateAge(birthYearValue);
      age.value = ageValue;
    } else {
      age.value = "";
    }
  };

  birthYear.addEventListener("input", currentAge);

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      validateAndStoreData();
    });
  }

  const registerButton = document.querySelector(".submit a");
  if (registerButton) {
    registerButton.addEventListener("click", (e) => {
      e.preventDefault();
      validateAndStoreData();
    });
  }
});

const validateAndStoreData = () => {
  const formData = {
    fullName: getInputValue("#full-name"),
    dateOfBirth: getInputValue("#date-of-birth"),
    gender: getInputValue("#gender"),
    guardianName: getInputValue("#guardian-name"),
    address: getInputValue("#address"),
    phone: getInputValue("#phone"),
    grade: getInputValue("#grade")
  };

  if (isFormValid(formData)) {
    saveDataToLocalStorage(formData);
    window.location.href = "addstudent_list.html";
  } else {
    alert("Please fill in all the required fields.");
  }
};

const getInputValue = (selector) => {
  return document.querySelector(selector).value.trim();
};

const isFormValid = (formData) => {
  return Object.values(formData).every(value => value !== "");
};

const saveDataToLocalStorage = (formData) => {
  const existingData = JSON.parse(localStorage.getItem("studentData")) || [];
  existingData.push(formData);
  localStorage.setItem("studentData", JSON.stringify(existingData));
};
