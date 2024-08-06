const btn = document.getElementById('cal');
const result = document.getElementById('mortgage_result');
const hiResult = document.getElementById('home_insurance');
const taxResult = document.getElementById('tax_result');
const totalResult = document.getElementById('total_result');

const PtaxResult = document.getElementById('legend_color1');
const PhiResult = document.getElementById('legend_color2');
const PtotalResult = document.getElementById('legend_color3');

let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Taxes & Other Fees', 'Home Insurance', 'Mortgage Payment (P&I)'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ['#FFCE56', '#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FFCE56', '#FF6384', '#36A2EB']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': $' + tooltipItem.raw.toLocaleString();
                        }
                    }
                },
                title: {
                    display:true,
                    text : 'Monthly Payment Pie Chart',
                    font: {
                        size: 19
                    }
                }
            }
        }
    });




btn.addEventListener('click', function() {
    const input1 = document.getElementById('home').value;
    const input2 = document.getElementById('down').value;
    const input3 = document.getElementById('rate').value;
    const input4 = document.getElementById('time').value;
    const input5 = document.getElementById('annual').value;
    const input6 = document.getElementById('insurance').value;
    const input7 = document.getElementById('hoa').value;



    const P = Number(input1) - Number(input2);
    const r = (Number(input3) / 100) / 12; // Convert year rate to month rate
    const n = Number(input4) * 12;
    // Mortgage payment formula
    const M = P * r * Math.pow((1 + r), n) / (Math.pow((1 + r), n) - 1);

    const annualTax = Number(input1) * (Number(input5) / 100) / 12;
    const annualInsurance= Number(input6) / 12;
    const monthlyHoa = Number(input7);

    const F = annualInsurance;
    const TF = monthlyHoa + annualTax;
    const TR = M + F + TF;

    result.textContent = isNaN(M) ? 'Invalid input' : '$' + M.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    hiResult.textContent = isNaN(F) ? 'Invalid input' : '$' + F.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    taxResult.textContent = isNaN(TF) ? 'Invalid input' : '$' + TF.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    totalResult.textContent = isNaN(TR) ? 'Invalid input' : '$' + TR.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    PtaxResult.textContent = isNaN(TF) ? 'Invalid input' : '$' + TF.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    PhiResult.textContent = isNaN(F) ? 'Invalid input' : '$' + F.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    PtotalResult.textContent = isNaN(M) ? 'Invalid input' : '$' + M.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    myChart.data.datasets[0].data = [Math.round(TF), Math.round(F), Math.round(M)];
    myChart.update();
});

// const nonClick = document.querySelectorAll(".non-click");

// function handleClick(event) {
//   // div에서 모든 "click" 클래스 제거
//   nonClick.forEach((e) => {
//     e.classList.remove("click");
//   });
//   // 클릭한 div만 "click"클래스 추가
//   event.target.classList.add("click");
// }

// nonClick.forEach((e) => {
//   e.addEventListener("click", handleClick);
// });




