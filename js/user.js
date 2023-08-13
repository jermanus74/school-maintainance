document.addEventListener("DOMContentLoaded", (e) => {
    const formDataString = localStorage.getItem("formData");
    // Parse the JSON string back to an object
    const formData = JSON.parse(formDataString);

    if (formData) {
        const firstName_value = document.querySelector("#first-name")
        const lastName_value = document.querySelector("#last-name")
        const profileID = document.querySelector(".text-center");

        profileID.textContent = formData.fullName;

        const fullName = formData.fullName;
        const [firstName, lastName] = fullName.split(" ");
        firstName_value.value = firstName;
        lastName_value.value = lastName;

        // Get the first letter of the first and last names (capitalized)
        const firstNameFirstLetter = firstName.charAt(0).toUpperCase();
        const lastNameFirstLetter = lastName.charAt(0).toUpperCase();
        const initials = firstNameFirstLetter + lastNameFirstLetter;
        const userImage = document.querySelector("#user-image");
        userImage.setAttribute("src", `https://placehold.it/150x150&text=${initials}`);
        userImage.setAttribute("alt", "Image");
        userImage.classList.add("shadow");

    } else {
        console.log("No form data found in Local Storage.");
    }

    const datastored = () => {
        const existingAccountDataJSON = localStorage.getItem("accountData");
        const existingAccountData = JSON.parse(existingAccountDataJSON);
    
        if (existingAccountData) {
            const firstNameInput = document.getElementById("first-name");
            const lastNameInput = document.getElementById("last-name");
            const phoneNumberInput = document.querySelector(".form-control[type='text']");
            const bioInput = document.querySelector(".form-control[rows='4']");
    
            firstNameInput.value = existingAccountData.firstName;
            lastNameInput.value = existingAccountData.lastName;
            phoneNumberInput.value = existingAccountData.phoneNumber;
            bioInput.value = existingAccountData.bio;
        }
    
        // Add event listener to the "Update" button in the "Account" tab content
        const updateAccountBtn = document.querySelectorAll(".btn-primary");
        updateAccountBtn.forEach(btn => btn.addEventListener("click", () => {
            const firstNameValue = document.getElementById("first-name").value;
            const lastNameValue = document.getElementById("last-name").value;
            const phoneNumberValue = document.querySelector(".form-control[type='text']").value;
            const bioValue = document.querySelector(".form-control[rows='4']").value;
    
            // Create an object with the data
            const accountData = {
                firstName: firstNameValue,
                lastName: lastNameValue,
                phoneNumber: phoneNumberValue,
                bio: bioValue
            };
    
            const accountDataJSON = JSON.stringify(accountData);
    
            localStorage.setItem("accountData", accountDataJSON);
            alert("Account settings updated successfully!");
        }));
    };
    
    datastored();
});



