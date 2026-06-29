const form1 = document.querySelector(".form1");

const form2 = document.querySelector(".form2");

const btn1 = document.querySelector(".btn1");

const btn2 = document.querySelector(".btn2");

const register = document.querySelector(".register");

const login = document.querySelector(".login");

const Name = document.querySelector(".username");

const Password = document.querySelector(".password");

const LName = document.querySelector(".login-username");

const LPassword = document.querySelector(".login-password");

const dashboard = document.querySelector(".dashboard");

const themeToggle = document.querySelector(".dark-mode");

const addBtn = document.querySelector(".add-btn");

const popup = document.querySelector(".transaction-popup");

const closePopup = document.querySelector(".close-popup");

const transactionForm = document.querySelector(".transaction-form");

const transactionBody = document.querySelector(".transaction-body");

const type = document.querySelector(".type");

const description = document.querySelector(".description");

const amount = document.querySelector(".amount");

const date = document.querySelector(".date");

const category = document.querySelector(".category");

const balance = document.querySelector(".balance");

const income = document.querySelector(".income");

const expenses = document.querySelector(".expenses");

const totalTransactions = document.querySelector(".total-transactions");

const logout = document.querySelector(".logout");

const reset = document.querySelector(".reset-btn");

const dashboardLink = document.querySelector(".dashboard-link");

const settingsLink = document.querySelector(".settings-link");

const mainContent = document.querySelector(".main-content");

const settingsPage = document.querySelector(".settings-page");

const profileName = document.querySelector(".profile-name");

const currency = document.querySelector(".currency");

const displayName = document.querySelector(".display-name");

const saveSettings = document.querySelector(".save-settings");

const symbol = localStorage.getItem("currency") || "$";

const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let editIndex = null;

register.addEventListener("click", (event) => {
    event.preventDefault();
    form1.style.display = "block";
    form2.style.display = "none";
    
});


login.addEventListener("click", (event) => {
    event.preventDefault();
    form1.style.display = "none";
    form2.style.display = "block";
    
});



form1.addEventListener("submit", (event) => {
    event.preventDefault();

    const user = {
        username: Name.value,
        password: Password.value
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");

    form1.reset();
    form1.style.display = "none";
    form2.style.display = "block";
});

form2.addEventListener("submit", (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (
        user &&
        LName.value === user.username &&
        LPassword.value === user.password
    ) {
       alert("Login Successful!");

       displayName.textContent = user.username;

    localStorage.setItem("isLoggedIn", "true");

    form2.style.display = "none";
    dashboard.style.display = "flex";

    profileName.value = user.username;

const savedCurrency = localStorage.getItem("currency");

if (savedCurrency) {
    currency.value = savedCurrency;
}
    } else {
        alert("Invalid Username or Password");
    }
});

themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        document.body.style.backgroundColor = "#f3f4f6";
        dashboard.style.backgroundColor = "#0f172a";
    } else {
        document.body.style.backgroundColor = "#ffffff";
        dashboard.style.backgroundColor = "#ffffff";
    }
});

addBtn.addEventListener("click", () => {
    popup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});

popup.addEventListener("click", (event) => {
    if(event.target === popup){
        popup.style.display = "none";
    }
});

transactionForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const obj = {
        type: type.value,
        description: description.value,
        amount: amount.value,
        date: date.value,
        category: category.value
    };

    if(editIndex === null){
        transactions.push(obj);
    }else{
        transactions[editIndex] = obj;
        editIndex = null;
    }
    localStorage.setItem("transactions", JSON.stringify(transactions));

    renderTransactions();

    transactionForm.reset();

    popup.style.display = "none";

});

function renderTransactions(){

    transactionBody.innerHTML = "";

    transactions.forEach((transaction,index)=>{

        transactionBody.innerHTML += `
        <tr>

            <td>${transaction.date}</td>

            <td>${transaction.description}</td>

            <td>
                <span class="badge">${transaction.category}</span>
            </td>

            <td class="${transaction.type==="Income" ? "income" : "expense"}">
                ${transaction.type==="Income" ? "+" : "-"}${localStorage.getItem("currency") || "$"}${transaction.amount}
            </td>

            <td>

                <button onclick="editTransaction(${index})" class="icon-btn">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button onclick="deleteTransaction(${index})" class="icon-btn delete">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </td>

        </tr>
        `;

        

    });
updateDashboard();
}

function deleteTransaction(index){

    transactions.splice(index,1);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    renderTransactions();
    updateDashboard();

}

function editTransaction(index){

    popup.style.display = "flex";

    editIndex = index;

    type.value = transactions[index].type;

    description.value = transactions[index].description;

    amount.value = transactions[index].amount;

    date.value = transactions[index].date;

    category.value = transactions[index].category;

}

window.editTransaction = editTransaction;

window.deleteTransaction = deleteTransaction;

if(localStorage.getItem("isLoggedIn") === "true"){

    const savedUser = JSON.parse(localStorage.getItem("user"));

if(savedUser){
    displayName.textContent = savedUser.username;
}
    const user = JSON.parse(localStorage.getItem("user"));

if(user){
    profileName.value = user.username;
}

const savedCurrency = localStorage.getItem("currency");

if(savedCurrency){
    currency.value = savedCurrency;
}
    form1.style.display = "none";
    form2.style.display = "none";
    dashboard.style.display = "flex";
}


logout.addEventListener("click", () => {

    localStorage.removeItem("isLoggedIn");

    location.reload();

});

const ctx = document.getElementById("cashChart");

let cashChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Income", "Expenses"],
        datasets: [{
            label: "Amount",
            data: [0, 0],
            backgroundColor: [
                "#22c55e",
                "#ef4444"
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

renderTransactions();




function updateDashboard() {

    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {

        if(transaction.type === "Income"){
            incomeTotal += Number(transaction.amount);
        }else{
            expensesTotal += Number(transaction.amount);
        }

    });

    const currentBalance = incomeTotal - expensesTotal;

    income.textContent = `${symbol}${incomeTotal.toFixed(2)}`;
    expenses.textContent = `${symbol}${expensesTotal.toFixed(2)}`;
    balance.textContent = `${symbol}${currentBalance.toFixed(2)}`;
    totalTransactions.textContent = transactions.length;

    cashChart.data.datasets[0].data = [
    incomeTotal,
    expensesTotal
];

cashChart.update();


}

reset.addEventListener("click", () => {

    transactions.length = 0;

    localStorage.removeItem("transactions");

    renderTransactions();


});

dashboardLink.addEventListener("click",(e)=>{

    e.preventDefault();

    mainContent.style.display="block";
    settingsPage.style.display="none";

    dashboardLink.classList.add("active");
    settingsLink.classList.remove("active");

});

settingsLink.addEventListener("click",(e)=>{

    e.preventDefault();

    mainContent.style.display="none";
    settingsPage.style.display="block";

    settingsLink.classList.add("active");
    dashboardLink.classList.remove("active");

});

saveSettings.addEventListener("click", () => {

    const user = JSON.parse(localStorage.getItem("user"));

    user.username = profileName.value;

    localStorage.setItem("user", JSON.stringify(user));

    localStorage.setItem("currency", currency.value);

    updateDashboard();

    alert("Changes Saved Successfully!");

});