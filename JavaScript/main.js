document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('cal');
    const result = document.getElementById('result');
    const totalProfitDiv = document.getElementById('total_profit');
    const resultingAmountDiv = document.getElementById('resulting_amount');
    const lightModeIcon = document.getElementById('lightMode');
    const darkModeIcon = document.getElementById('darkMode');

    btn.addEventListener('click', calculateCompoundInterest);

    function calculateCompoundInterest() {
        const input1 = document.getElementById('Initial').value;
        const input2 = document.getElementById('time').value;
        const input3 = document.getElementById('rate').value;

        const P = Number(input1);
        const t = Number(input2);
        const r = Number(input3) / 100;
        const n = 12; // Set the compounding period to 12 times per year

        let total = P;
        let totalProfit = 0;
        const tbody = document.querySelector('#table_results tbody');
        tbody.innerHTML = ''; // Reset previous results

        for (let i = 1; i <= t; i++) {
            const profit = total * r;
            total += profit;
            totalProfit += profit;

            // Add the results to the table
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${i}</td>
                <td>+${profit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td>${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td>${(r * 100).toFixed(2)}%</td>
            `;
            tbody.appendChild(row);
        }

        totalProfitDiv.innerHTML = `$${totalProfit.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        resultingAmountDiv.innerText = `$${total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        result.value = isNaN(total) ? 'Invalid input' : `$${total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }

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

    lightModeIcon.addEventListener('click', () => setDarkMode(false));
    darkModeIcon.addEventListener('click', () => setDarkMode(true));

    // Apply the current mode when the page loads
    applyCurrentMode();
});