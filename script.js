// Function to fetch rates from an API and update the DOM
async function updateRates() {
    try {
        // Define the API endpoint and headers with the API key
        const apiUrl = 'https://www.westernunion.com/wuconnect/prices/products';

        // Fetch data from the API with headers
        const response = await fetch(apiUrl, { method: 'GET', headers: { 'Authorization': 'Bearer 2fb48e04-f2a9-4a71-b793-cc1520db9071' } });
        const data = await response.json();

        // Assuming the API returns an object with country names as keys and rates as values
        const countries = Object.keys(data);

        countries.forEach(country => {
            // Select all country headers
            const countryHeaders = document.querySelectorAll('.country-header h2');

            // Find the country element by matching text content
            countryHeaders.forEach(header => {
                if (header.textContent.trim() === country) {
                    const rateBoxes = header.parentElement.parentElement.querySelectorAll('.rate-box');
                    const rates = data[country];

                    // Update each rate box with the corresponding rate
                    rateBoxes.forEach((box, index) => {
                        const rateType = box.querySelector('p').textContent.trim();
                        if (rates[rateType]) {
                            box.querySelector('span').textContent = rates[rateType];
                        }
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error fetching rates:', error);
    }
}

// Call the function to update rates
updateRates();