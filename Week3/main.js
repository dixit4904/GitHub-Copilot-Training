// =======================
// Utility Functions
// =======================

/**
 * Adds two numbers.
 * @param {number} a - First number.
 * @param {number} b - Second number.
 * @returns {number} Sum of a and b.
 */
function add(a, b) {
    return a + b;
}

/**
 * Subtracts second number from first number.
 * @param {number} a - First number.
 * @param {number} b - Second number.
 * @returns {number} Result of a minus b.
 */
function subtract(a, b) {
    return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a - First number.
 * @param {number} b - Second number.
 * @returns {number} Product of a and b.
 */
function multiply(a, b) {
    return a * b;
}

/**
 * Divides first number by second number.
 * @param {number} a - Numerator.
 * @param {number} b - Denominator.
 * @returns {number|string} Result of division or error message if dividing by zero.
 */
function divide(a, b) {
    if (b === 0) return 'Cannot divide by zero';
    return a / b;
}

/**
 * Returns a greeting message for the user.
 * @param {string} name - Name of the user.
 * @returns {string} Greeting message.
 */
function greetUser(name) {
    return `Hello, ${name}!`;
}

/**
 * Calculates the factorial of a number.
 * @param {number} n - The number.
 * @returns {number} Factorial of n.
 */
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

/**
 * Checks if a number is prime.
 * @param {number} num - The number to check.
 * @returns {boolean} True if prime, false otherwise.
 */
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

/**
 * Finds the maximum value in an array.
 * @param {number[]} arr - Array of numbers.
 * @returns {number} Maximum value.
 */
function maxInArray(arr) {
    return Math.max(...arr);
}

/**
 * Finds the minimum value in an array.
 * @param {number[]} arr - Array of numbers.
 * @returns {number} Minimum value.
 */
function minInArray(arr) {
    return Math.min(...arr);
}

// =======================
// Classes
// =======================

/**
 * Calculator class for basic arithmetic operations.
 */
class Calculator {
    /**
     * Creates a Calculator instance.
     * @param {string} name - Name of the calculator.
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * Adds two numbers.
     * @param {number} a - First number.
     * @param {number} b - Second number.
     * @returns {number} Sum of a and b.
     */
    add(a, b) {
        return a + b;
    }

    /**
     * Subtracts second number from first number.
     * @param {number} a - First number.
     * @param {number} b - Second number.
     * @returns {number} Result of a minus b.
     */
    subtract(a, b) {
        return a - b;
    }

    /**
     * Multiplies two numbers.
     * @param {number} a - First number.
     * @param {number} b - Second number.
     * @returns {number} Product of a and b.
     */
    multiply(a, b) {
        return a * b;
    }

    /**
     * Divides first number by second number.
     * @param {number} a - Numerator.
     * @param {number} b - Denominator.
     * @returns {number|string} Result of division or error message if dividing by zero.
     */
    divide(a, b) {
        return b === 0 ? 'Cannot divide by zero' : a / b;
    }
}

/**
 * Class representing a person.
 */
class Person {
    /**
     * Creates a Person instance.
     * @param {string} name - Name of the person.
     * @param {number} age - Age of the person.
     */
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    /**
     * Returns a greeting message.
     * @returns {string} Greeting message.
     */
    greet() {
        return `Hi, my name is ${this.name} and I am ${this.age} years old.`;
    }

    /**
     * Increases age by one and returns a birthday message.
     * @returns {string} Birthday message.
     */
    haveBirthday() {
        this.age += 1;
        return `Happy Birthday ${this.name}! You are now ${this.age}.`;
    }
}

/**
 * Class representing a student, extends Person.
 */
class Student extends Person {
    /**
     * Creates a Student instance.
     * @param {string} name - Name of the student.
     * @param {number} age - Age of the student.
     * @param {number} grade - Grade of the student.
     */
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }

    /**
     * Returns a message about the subject being studied.
     * @param {string} subject - Subject to study.
     * @returns {string} Study message.
     */
    study(subject) {
        return `${this.name} is studying ${subject}.`;
    }

    /**
     * Returns the grade of the student.
     * @returns {string} Grade message.
     */
    getGrade() {
        return `${this.name} is in grade ${this.grade}.`;
    }
}

/**
 * Class representing a bank account.
 */
class BankAccount {
    /**
     * Creates a BankAccount instance.
     * @param {string} owner - Owner of the account.
     * @param {number} [balance=0] - Initial balance.
     */
    constructor(owner, balance = 0) {
        this.owner = owner;
        this.balance = balance;
    }

    /**
     * Deposits an amount into the account.
     * @param {number} amount - Amount to deposit.
     * @returns {string} Deposit message with new balance.
     */
    deposit(amount) {
        this.balance += amount;
        return `Deposited ${amount}. New balance is ${this.balance}.`;
    }

    /**
     * Withdraws an amount from the account.
     * @param {number} amount - Amount to withdraw.
     * @returns {string} Withdrawal message or insufficient funds message.
     */
    withdraw(amount) {
        if (amount > this.balance) {
            return `Insufficient funds! Balance is ${this.balance}.`;
        }
        this.balance -= amount;
        return `Withdrew ${amount}. Remaining balance is ${this.balance}.`;
    }

    /**
     * Gets the current balance.
     * @returns {number} Current balance.
     */
    getBalance() {
        return this.balance;
    }
}

/**
 * Class representing a user.
 * @class
 * @property {string} name - The name of the user.
 * @property {number} age - The age of the user.
 */
class User {
    /**
     * Create a user.
     * @param {string} name - The name of the user.
     * @param {number} age - The age of the user.
     */
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    /**
     * Get a greeting message for the user.
     * @returns {string} Greeting message.
     */
    getGreeting() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
}

/**
 * Fetch user data from an API.
 * @async
 * @function
 * @param {string} url - The API endpoint URL.
 * @returns {Promise<Object>} The user data object.
 */
async function fetchUserData(url) {
    // Simulate fetching user data from an API
    const response = await fetch(url);
    return await response.json();
}

/**
 * Filter users by minimum age.
 * @function
 * @param {User[]} users - Array of User objects.
 * @param {number} minAge - Minimum age to filter.
 * @returns {User[]} Filtered array of User objects.
 */
function filterUsersByAge(users, minAge) {
    return users.filter(user => user.age >= minAge);
}
