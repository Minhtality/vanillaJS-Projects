const loanForm = document.querySelector('#loan-form');

loanForm.addEventListener('submit', calculateResults);


function calculateResults(event) {
    console.log('calculating...');
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthyPayment = document.querySelector('#monthy-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    //gross
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute monthly payment

    event.preventDefault();
}