const signUp = () => {
    const form = document.querySelector("#form");
    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirm-password");
    const user_name = document.querySelector("#full-name");
    const email = document.querySelector("#email");
    const passwordFormatMessage = document.querySelector(".passwordFormat");
    const fullNameFormatMessage = document.querySelector(".fullNameFormat");

    const setError = (element, message) => {
        const form_group = element.parentElement;
        const errorDisplay = form_group.querySelector(".error");

        errorDisplay.innerText = message;
        form_group.classList.add("error");
        form_group.classList.remove("success");
    };

    const setSuccess = element => {
        const form_group = element.parentElement;
        const errorDisplay = form_group.querySelector(".error");

        errorDisplay.innerText = "";
        form_group.classList.add("success");
        form_group.classList.remove("error");
    };

    const isValidEmail = email => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validateInputs = () => {
        const usernameValue = user_name.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const password2Value = confirmPassword.value.trim();

        const fullNameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
        if (usernameValue === "") {
            setError(user_name, "Full Name is required");
        } else if (!fullNameRegex.test(usernameValue)) {
            setError(user_name, "Full Name must have 'your two names'");
        } else {
            setSuccess(user_name);
        }

        if (emailValue === "") {
            setError(email, "Email is required");
        } else if (!isValidEmail(emailValue)) {
            setError(email, "Provide a valid email address");
        } else {
            setSuccess(email);
        }

        if (passwordValue === "") {
            setError(password, "Password is required");
        } else if (passwordValue.length < 8) {
            setError(password, "Password must be at least 8 characters");
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])[A-Za-z\d]{4,12}$/.test(passwordValue)) {
            setError(password, "Password must contain at least one capital letter, one number, and other small letters");
        } else {
            setSuccess(password);
        }

        if (password2Value === "") {
            setError(confirmPassword, "Confirm Password is required");
        } else if (password2Value !== passwordValue) {
            setError(confirmPassword, "Passwords do not match");
        } else {
            setSuccess(confirmPassword);
        }

        if (
            user_name.parentElement.classList.contains("success") &&
            email.parentElement.classList.contains("success") &&
            password.parentElement.classList.contains("success") &&
            confirmPassword.parentElement.classList.contains("success")
        ) {
            window.location.href = "home.html";
        }
        saveDataToLocalStorage();
    };

    password.addEventListener("input", () => {
        const passwordValue = password.value.trim();
        const passwordFormatRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])[A-Za-z\d]{4,12}$/;

        if (passwordValue.length < 8) {
            passwordFormatMessage.innerText = "Password must be at least 8 characters";
        } else if (!passwordFormatRegex.test(passwordValue)) {
            passwordFormatMessage.innerText =
                "Password must contain at least one capital letter, one number, and other small letters";
        } else {
            passwordFormatMessage.innerText = "";
        }
    });

    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            validateInputs();
        });

        user_name.addEventListener("input", () => {
            const usernameValue = user_name.value.trim();
            const fullNameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;

            if (usernameValue === "") {
                fullNameFormatMessage.innerText = "Full Name is required";
            } else if (!fullNameRegex.test(usernameValue)) {
                fullNameFormatMessage.innerText = "Fill your 'First Last name'";
            } else {
                fullNameFormatMessage.innerText = "";
            }
        });
    }

    const saveDataToLocalStorage = () => {
        const formData = {
            fullName: user_name.value.trim(),
            email: email.value.trim(),
            password: password.value.trim()
        };

        localStorage.setItem("formData", JSON.stringify(formData));
    };

   
};

signUp();