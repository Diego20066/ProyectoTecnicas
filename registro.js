class Usuario {
  constructor(cedula, nombre, correo, fecha, clave) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.correo = correo;
    this.fecha = fecha;
    this.clave = clave;
  }
}

function registrarUsuario() {
  const cedula = document.getElementById("cedula").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim().toLowerCase();
  const fecha = document.getElementById("fecha").value;
  const clave = document.getElementById("clave").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Validación de campos vacíos
  if (!cedula || !nombre || !correo || !fecha || !clave) {
    alert("❌ Todos los campos son obligatorios.");
    return;
  }

  // Validar cédula ecuatoriana
  if (!validarCedulaEcuatoriana(cedula)) {
    alert("❌ Cédula ecuatoriana inválida.");
    return;
  }

  // Validar formato de correo
  if (!validarCorreo(correo)) {
    alert("❌ Correo electrónico inválido.");
    return;
  }

  // Validar edad mínima
  if (!validarEdad(fecha)) {
    alert("❌ Debes tener al menos 18 años.");
    return;
  }

  // Validar longitud de la contraseña
  if (clave.length < 6) {
    alert("❌ La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  // Validar cédula duplicada
  if (usuarios.some(u => u.cedula === cedula)) {
    alert("❌ Ya existe un usuario con esta cédula.");
    return;
  }

  // Crear nuevo usuario
  const nuevo = new Usuario(cedula, nombre, correo, fecha, clave);
  usuarios.push(nuevo);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  limpiarFormulario();
  alert("✅ Usuario registrado correctamente.");
}

// Limpiar los campos del formulario
function limpiarFormulario() {
  document.getElementById("cedula").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("clave").value = "";
}

// Validar formato de correo electrónico
function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

// Validar cédula ecuatoriana (algoritmo oficial)
function validarCedulaEcuatoriana(cedula) {
  if (cedula.length !== 10) return false;
  const digitos = cedula.split('').map(Number);
  const coef = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;

  for (let i = 0; i < 9; i++) {
    let mult = digitos[i] * coef[i];
    if (mult > 9) mult -= 9;
    suma += mult;
  }

  const digitoValidador = (10 - (suma % 10)) % 10;
  return digitoValidador === digitos[9];
}

// Validar que el usuario tenga al menos 18 años
function validarEdad(fechaNacimiento) {
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  const fechaMinima = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
  return nacimiento <= fechaMinima;
}


