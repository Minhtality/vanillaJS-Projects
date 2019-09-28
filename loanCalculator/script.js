const resultsEL = document.querySelector('#results');
const loading = document.querySelector('#loading');

document.querySelector('#loan-form').addEventListener('submit', event => {
    //hide results initially
    resultsEL.style.display = 'none';
    //show loading on submit
    loading.style.display = 'block';
    //set timeout
    setTimeout(calculateResults, 1000);

    event.preventDefault();
});

function calculateResults() {
    console.log('calculating...');
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    //gross
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute monthly payment
    //formula => PV = Monthly Payment / Interest * ( 1 - (1/(1 + interest)^n ) )
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1)

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //hide loading
        loading.style.display = 'none';
        //show results
        resultsEL.style.display = 'block';

    } else {
        showError("Please check your inputs");
        loading.style.display = 'none';
    }

}

//show error function and create a div

function showError(error) {
    //create a div
    const errorDiv = document.createElement('div');
    //get card element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //add class
    errorDiv.className = 'alert alert-danger';
    //create or insert textnode
    errorDiv.appendChild(document.createTextNode(error));
    //append above card/header
    card.insertBefore(errorDiv, heading);
    //time out
    setTimeout(clearError, 2000);
}

//clear errors
function clearError() {
    document.querySelector('.alert').remove();
}