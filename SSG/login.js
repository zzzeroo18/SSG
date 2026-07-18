const USERS_DATABASE = [
    { username: "admin", password: "123" },
    { username: "astesana", password: "sgg" }
];

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const themeToggle = document.getElementById("theme-toggle");
    const messageBox = document.getElementById("message-box");

    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const usernameInput = document.getElementById("username").value.trim();
        const passwordInput = document.getElementById("password").value.trim();

        messageBox.textContent = "";
        messageBox.className = "";

        const userFound = USERS_DATABASE.find(u => u.username === usernameInput);

        if (!userFound) {
            showResult("Usuario no registrado.", "error");
            return;
        }

        if (userFound.password !== passwordInput) {
            showResult("Contraseña incorrecta.", "error");
            return;
        }

        showResult("¡Ingreso exitoso! Redireccionando...", "success");
        localStorage.setItem("sessionActive", usernameInput);
        
        setTimeout(() => {
            alert("Bienvenido al SGG");
        }, 1500);
    });

    function showResult(text, type) {
        messageBox.textContent = text;
        messageBox.className = type;
    }
});