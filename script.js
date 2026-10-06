// ==========================================
// РІВЕНЬ 4-6 БАЛІВ
// ==========================================

// 1. Привітання користувача
function getFullName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

function showGreeting(fullName, age) {
    alert(`Hello, ${fullName}! You are ${age} years old.`);
}

function task4_1() {
    let firstName = prompt("Введіть ім'я:");
    let lastName = prompt("Введіть прізвище:");
    let age = prompt("Введіть вік:");
    
    if (firstName && lastName && age) {
        let fullName = getFullName(firstName, lastName);
        showGreeting(fullName, age);
    }
}

// 2. Оцінка студента
function getStudentInfo() {
    let name = prompt("Введіть ім'я студента:");
    let score = prompt("Введіть бал студента (0-12):");
    return { name, score: Number(score) };
}

function checkGrade(score) {
    if (score >= 10 && score <= 12) return "Excellent";
    if (score >= 7 && score <= 9) return "Good";
    if (score >= 4 && score <= 6) return "Satisfactory";
    return "Fail";
}

function showStudentResult(name, grade) {
    alert(`Student: ${name}\nGrade: ${grade}`);
}

function task4_2() {
    let student = getStudentInfo();
    if (student.name && !isNaN(student.score)) {
        let grade = checkGrade(student.score);
        showStudentResult(student.name, grade);
    }
}

// 3. Обчислення чайових
function calculateTip(amount, percent = 10) {
    return (amount * percent) / 100;
}

function showTipResult(amount, tip) {
    let total = Number(amount) + Number(tip);
    alert(`Bill: ${amount} грн\nTip (10%): ${tip} грн\nTotal: ${total} грн`);
}

function task4_3() {
    let bill = prompt("Введіть суму рахунку (грн):", "450");
    if (bill && !isNaN(bill)) {
        let tip = calculateTip(Number(bill));
        showTipResult(bill, tip);
    }
}

// ==========================================
// РІВЕНЬ 7-9 БАЛІВ
// ==========================================

// 1. Таймер з колбеком
function startGreetingTimer(message, seconds, callback) {
    alert(`Таймер запущено на ${seconds} секунд...`);
    setTimeout(() => {
        alert(message);
        callback();
    }, seconds * 1000);
}

function task7_1() {
    startGreetingTimer("Час минув!", 3, () => alert("Time is up!"));
}

// 2. Калькулятор
function calculate(a, b, operation) {
    switch (operation) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Помилка: ділення на нуль';
        default: return 'Invalid operation';
    }
}

function task7_2() {
    let a = Number(prompt("Введіть перше число:"));
    let b = Number(prompt("Введіть друге число:"));
    let op = prompt("Введіть операцію (+, -, *, /):");
    
    let result = calculate(a, b, op);
    alert(`Результат: ${result}`);
}

// 3. Замикання (Closure Click Counter)
function createClickCounter() {
    let count = 0;
    return function() {
        count++;
        console.log(`Поточний рахунок лічильника: ${count}`);
        document.getElementById('out').innerText = `Кліків у консолі: ${count}`;
    };
}

const myCounter = createClickCounter();

function task7_3() {
    myCounter();
}

// ==========================================
// РІВЕНЬ 10-12 БАЛІВ
// ==========================================

// 1. Генератор випадкових чисел
function* randomGenerator(min, max) {
    while (true) {
        yield Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

let activeGen = null;

function startRandomGenerator() {
    let min = Number(prompt("Введіть мінімальне значення (min):", "1"));
    let max = Number(prompt("Введіть максимальне значення (max):", "100"));
    
    if (!isNaN(min) && !isNaN(max)) {
        activeGen = randomGenerator(min, max);
        let nextBtn = document.getElementById('next');
        nextBtn.style.display = 'inline-block';
        nextBtn.onclick = () => {
            let val = activeGen.next().value;
            document.getElementById('out').innerText = `Згенеровано число: ${val}`;
        };
        document.getElementById('out').innerText = "Натискайте 'Next number' для генерації чисел!";
    }
}

// 2. Генератор паролів (next(value))
function* passwordGenerator() {
    let password = "";
    while (true) {
        let char = yield password;
        if (char === 'done') break;
        if (char) password += char;
    }
    return password;
}

function task10_2() {
    let gen = passwordGenerator();
    gen.next(); // запуск генератора
    
    while (true) {
        let input = prompt("Введіть символ для пароля (або 'done' для завершення):");
        if (!input || input === 'done') {
            let res = gen.next('done');
            alert(`Ваш готовий пароль: ${res.value}`);
            break;
        } else {
            gen.next(input);
        }
    }
}

// 3. Генератор діалогів (Чат-бот)
function* chatBot() {
    let name = yield "Hi! What is your name?";
    let status = yield `Nice to meet you, ${name}! How are you?`;
    yield "Goodbye!";
}

function task10_3() {
    let bot = chatBot();
    let q1 = bot.next().value;
    let name = prompt(q1);
    
    if (name) {
        let q2 = bot.next(name).value;
        let status = prompt(q2);
        let q3 = bot.next(status).value;
        alert(q3);
    }
}

// 4. Втрата контексту та bind
const user = {
    name: 'Alex',
    say() { 
        alert(`Hello, ${this.name}`); 
    }
};

window.onload = function() {
    let nameInput = prompt("Введіть ім'я для користувача в об'єкті user:", "Denys");
    if (nameInput) user.name = nameInput;
    
    let btn = document.getElementById('hello');
    // Прив'язуємо правильний контекст this за допомогою .bind()
    btn.onclick = user.say.bind(user);
};