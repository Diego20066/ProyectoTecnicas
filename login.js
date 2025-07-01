document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const cedula = document.getElementById("username").value.trim(); // solo cédula
  const clave = document.getElementById("password").value.trim();

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioEncontrado = usuarios.find(function (usuario) {
    return usuario.cedula === cedula && usuario.clave === clave;
  });

  const mensaje = document.getElementById("message");

  if (usuarioEncontrado) {
    // 🔽 Aquí guardas el usuario activo
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    mensaje.textContent = "✅ Inicio de sesión exitoso. Redirigiendo...";
    mensaje.style.color = "green";

    setTimeout(function () {
      window.location.href = "pagina2.html"; // Cambia esto al nombre de tu página principal
    }, 1500);
  } else {
    mensaje.textContent = "❌ Cédula o contraseña incorrectos.";
    mensaje.style.color = "red";
  }
});




