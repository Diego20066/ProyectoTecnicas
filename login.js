document.addEventListener('DOMContentLoaded', () => {
  const user = "admin";
  const password = "123456";

  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // evita que la página se recargue

    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    if (usernameInput === user && passwordInput === password) {
      window.location.href = 'Menu.html'; 
    } else {
      alert("Ingrese sus credenciales nuevamente");
    }
  });
});
