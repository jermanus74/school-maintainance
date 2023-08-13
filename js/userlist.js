document.addEventListener("DOMContentLoaded", () => {
    const nameCell = document.querySelector("#name");
    const countryCell = document.querySelector("#country");

    const populateTableWithData = async () => {
        const storedData = localStorage.getItem("formData");
        if (storedData) {
            const formData = JSON.parse(storedData);

            nameCell.textContent = formData.fullName;

            // Call the function to get the user's country based on their coordinates
            const getUserCountry = () => {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(async position => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;

                        try {
                            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                            const data = await response.json();

                            if (data.countryName) {
                                countryCell.textContent = data.countryName;
                            }
                        } catch (error) {
                            console.error('Error fetching country:', error);
                        }
                    });
                } else {
                    console.error('Geolocation is not available');
                }
            };

            getUserCountry();
        }
    };

    populateTableWithData();
    localStorage.setItem('username', 'john_doe');
    localStorage.setItem('email', 'john@example.com');
});