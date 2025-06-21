// const user = "admin";
// const pasword = "123456";

// const userInput = document.getElementById("username");
// const paswordInput= document.getElementById("pasword");
// if (user === userInput & pasword === paswordInput){
//     alert("Bienvenido")
// }else{
//     alert("Ingrese los credenciales nuevamente")
// }
// login.js

document.addEventListener('DOMContentLoaded', () => {
  const user = "admin";
  const password = "123456";

  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // evita que la página se recargue

    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    if (usernameInput === user && passwordInput === password) {
      // Si las credenciales son correctas, redirige
      window.location.href = 'Menu.html'; // cámbialo por tu página destino
    } else {
      // Si no, muestra una alerta
      alert("Ingrese sus credenciales nuevamente");
    }
  });
});
