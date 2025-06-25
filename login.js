document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const identificador = document.getElementById("username").value.trim(); // cédula o correo
  const password = document.getElementById("password").value.trim();

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioEncontrado = usuarios.find(function (usuario) {
    return (
      (usuario.cedula === identificador || usuario.correo === identificador) &&
      usuario.password === password
    );
  });

  const mensaje = document.getElementById("message");

  if (usuarioEncontrado) {
    mensaje.textContent = "Inicio de sesión exitoso. Redirigiendo...";
    mensaje.style.color = "green";

    // Redirigir al menú después de un breve retraso
    setTimeout(function () {
      window.location.href = "menu.html";
    }, 1500);
  } else {
    mensaje.textContent = "Usuario o contraseña incorrectos.";
    mensaje.style.color = "red";
  }
});



