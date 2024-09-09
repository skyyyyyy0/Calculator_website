// const btn = document.getElementById('cal');
// const result = document.getElementById('result');
// const resultTd = document.getElementById('result-td');
// const numberTd = document.getElementById('number-td');
// const cumulativeTd = document.getElementById('cumulative-td');
// const totalTd = document.getElementById('total-td');


// btn.addEventListener('click', function() {
//     const P = document.getElementById('Initial').value;
//     const n = document.getElementById('time').value;
//     const rate = document.getElementById('rate').value /100;
//     const R = rate / 12;
    
//     const M = P * R * Math.pow(1 + R, n) / (Math.pow(1 + R, n) - 1);
//     const totalPayment = isNaN(M) ? 'Invalid input' : '$' + M.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     const cumulativePayment =  M * n + P;

//     result.value = totalPayment;
//     resultTd.textContent = totalPayment;
//     numberTd.textContent = n;
//     cumulativeTd.textContent = cumulativePayment.toFixed(2);
//     totalTd.textContent = '$' +(M * n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

   
// }); 

const btn = document.getElementById('cal');
const result = document.getElementById('result');
const resultTd = document.getElementById('result-td');
const numberTd = document.getElementById('number-td');
const cumulativeTd = document.getElementById('cumulative-td');
const totalTd = document.getElementById('total-td');

btn.addEventListener('click', function() {
    const P = Number(document.getElementById('Initial').value);
    const n = Number(document.getElementById('time').value); // Loan term in months
    const rate = Number(document.getElementById('rate').value) / 100; // Convert percentage to decimal
    const R = rate / 12; // Monthly interest rate

    const M = P * R * Math.pow(1 + R, n) / (Math.pow(1 + R, n) - 1);
    const formattedM = isNaN(M) ? 'Invalid input' : '$' + M.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const totalPayment = M * n;
    const cumulativePayment = totalPayment - P;

    result.value = formattedM;
    resultTd.textContent = formattedM;
    numberTd.textContent = n;
    cumulativeTd.textContent = isNaN(cumulativePayment) ? 'Invalid input' : '$' + cumulativePayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    totalTd.textContent = isNaN(totalPayment) ? 'Invalid input' : '$' + totalPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

// Light/Dark mode
document.getElementById('lightMode').addEventListener('click', function () {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    
});
document.getElementById('darkMode').addEventListener('click', function () {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
});