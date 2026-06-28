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

        form2.style.display = "none";
        dashboard.style.display = "flex";
    } else {
        alert("Invalid Username or Password");
    }
});
