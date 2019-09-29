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