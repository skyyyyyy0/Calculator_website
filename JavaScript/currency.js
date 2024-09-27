let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById('to-currency-select');

// Create dropdown from the currencies array 
currencies.forEach((currency) => {
    const option = document.createElement('option');
    option.value = currency;
    option.text = currency;
    fromDropDown.add(option);
});

// Repeat same thing for the other dropdown
currencies.forEach((currency) => {
    const option = document.createElement('option');
    option.value = currency;
    option.text = currency;
    toDropDown.add(option);
});

// Setting default values
fromDropDown.value = "USD";
toDropDown.value = "INR";

// API usage limit variables
const MAX_CALLS_PER_DAY = 45; // Adjusted to 45 calls per day
const COOLDOWN_TIME = 5000; // 5 seconds cooldown between calls
let lastCallTime = 0;

// Function to check API usage limit
function canMakeApiCall() {
    const now = Date.now();
    const today = new Date().toDateString();
    let usageData = JSON.parse(localStorage.getItem('apiUsage')) || {};

    if (usageData.date !== today) {
        usageData = { date: today, count: 0 };
    }

    if (usageData.count >= MAX_CALLS_PER_DAY) {
        alert("You've reached the maximum number of currency conversions for today. Please try again tomorrow.");
        return false;
    }

    if (now - lastCallTime < COOLDOWN_TIME) {
        alert(`Please wait ${((COOLDOWN_TIME - (now - lastCallTime)) / 1000).toFixed(1)} seconds before making another conversion.`);
        return false;
    }

    usageData.count++;
    localStorage.setItem('apiUsage', JSON.stringify(usageData));
    lastCallTime = now;
    return true;
}

let convertCurrency = () => {
    // Create References
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    // If input field is not empty
    if (amount.length != 0) {
        if (canMakeApiCall()) {
            fetch(api)
                .then((resp) => resp.json())
                .then((data) => {
                    let fromExchangeRate = data.conversion_rates[fromCurrency];
                    let toExchangeRate = data.conversion_rates[toCurrency];
                    const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
                    result.innerHTML = `${amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${fromCurrency} = ${convertedAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${toCurrency}`;
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('An error occurred while fetching the exchange rates. Please try again later.');
                });
        }
    } else {
        alert("Please fill in the amount");
    }
};

document.querySelector("#convert-button").addEventListener('click', convertCurrency);
window.addEventListener("load", convertCurrency);

// Light/Dark mode
function setDarkMode(isDark) {
    if (isDark) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
    localStorage.setItem('darkMode', isDark);
}

function applyCurrentMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
}

document.addEventListener('DOMContentLoaded', applyCurrentMode);

const lightModeBtn = document.getElementById('lightMode');
const darkModeBtn = document.getElementById('darkMode');

if (lightModeBtn && darkModeBtn) {
    lightModeBtn.addEventListener('click', () => setDarkMode(false));
    darkModeBtn.addEventListener('click', () => setDarkMode(true));
}

applyCurrentMode();