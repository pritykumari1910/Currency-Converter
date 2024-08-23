const apiKey = 'ce1f357bbfde41326c0b4dbf'; // Replace with your API key
const apiEndpoint = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;





async function fetchCurrencyData() {
    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);

        // Populate currency dropdowns
        const fromCurrencySelect = document.getElementById('fromCurrency');
        const toCurrencySelect = document.getElementById('toCurrency');

        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fromCurrencySelect.appendChild(option);
            toCurrencySelect.appendChild(option.cloneNode(true));
        });
    } catch (error) {
        console.error('Error fetching currency data:', error);
    }
}

document.getElementById('convertButton').addEventListener('click', async function() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (!amount || !fromCurrency || !toCurrency) {
        document.getElementById('result').textContent = 'Please enter a valid amount and select currencies.';
        return;
    }

    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency] / data.conversion_rates[fromCurrency];
        const result = amount * rate;

        document.getElementById('result').textContent = `Converted Amount: ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
    }
});

// Initialize the currency data on page load
fetchCurrencyData();
