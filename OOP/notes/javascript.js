// person constructor
function Person(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDay = new Date(dob);
}

//calculate age
Person.prototype.calculateAge = function () {
    const diff = Date.now() - this.birthDay.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
//get full name
Person.prototype.getFullName = function () {
    return `${this.firstName} ${this.lastName}`
}

//update lastname
Person.prototype.updateLastName = function (newLastName) {
    this.lastName = newLastName;
}
// customer constructor
function Customer(firstName, lastName, dob, phone, membership) {
    Person.call(this, firstName, lastName, dob);
    this.phone = phone;
    this.membership = membership;
}
//inheritance
Customer.prototype = Object.create(Person.prototype);
Customer.prototype.constructor = Customer;

const customer1 = new Customer("kevin", "Smith", "08-09-1991", "555-55-5555", "Standard")

const Kyle = new Person('Kyle', 'Ha', '09-09-1992');
console.log(Kyle.getFullName());

Kyle.updateLastName('Tran');
console.log(Kyle.getFullName());

console.log(customer1);