class Usuario {
  constructor(cedula, nombre, correo, fecha, clave) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.correo = correo;
    this.fecha = fecha;
    this.clave = clave;
  }
}

let usuarios = [];

function registrarUsuario() {
  const cedula = document.getElementById("cedula").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const fecha = document.getElementById("fecha").value;
  const clave = document.getElementById("clave").value;

  if (!cedula || !nombre || !correo || !fecha || !clave) {
    alert("❌ Todos los campos son obligatorios.");
    return;
  }

  if (!validarCedulaEcuatoriana(cedula)) {
    alert("❌ Cédula ecuatoriana inválida.");
    return;
  }

  if (!validarCorreo(correo)) {
    alert("❌ Correo electrónico inválido.");
    return;
  }

  if (!validarEdad(fecha)) {
    alert("❌ Debes tener al menos 18 años.");
    return;
  }

  if (clave.length < 6) {
    alert("❌ La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  if (usuarios.some(u => u.cedula === cedula)) {
    alert("❌ Ya existe un usuario con esta cédula.");
    return;
  }

  const nuevo = new Usuario(cedula, nombre, correo, fecha, clave);
  usuarios.push(nuevo);
  limpiarFormulario();
  alert("✅ Usuario registrado correctamente.");
}

function limpiarFormulario() {
  document.getElementById("cedula").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("clave").value = "";
}

function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

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

function validarEdad(fechaNacimiento) {
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  
  // Restar 18 años a la fecha actual
  const fechaMinima = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());

  return nacimiento <= fechaMinima;
}

