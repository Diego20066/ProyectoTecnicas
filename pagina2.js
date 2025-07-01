class Curso {
    constructor(facultad, modalidad, semestre, estado) {
        this.facultad = facultad;
        this.modalidad = modalidad;
        this.semestre = semestre;
        this.estado = estado;
    }
}

let cursos = [];
let cursoEnEdicion = null;

const cursosIniciales = [
    new Curso("medicina", "presencial", 10, "activa"),
    new Curso("ingenieria en sistemas", "híbrida", 8, "activa"),
    new Curso("derecho", "virtual", 8, "activa"),
    new Curso("arquitectura", "virtual", 8, "inactiva"),
    new Curso("psicología", "presencial", 8, "inactiva")
];

window.onload = function () {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuario && usuario.nombre) {
        document.querySelector("header h1").innerHTML = "👋 Bienvenido, " + usuario.nombre;
    } else {
        document.querySelector("header h1").innerHTML = "👋 Bienvenido";
    }

    if (cursos.length === 0) {
        cursosIniciales.forEach((curso, i) => {
            cursos.push(curso);
            agregarCursosATabla(curso, i + 1);
        });
    }

    // Validaciones en tiempo real
    document.getElementById("facultad").addEventListener("input", function () {
        permitirSoloLetras(this);
    });

    document.getElementById("modalidad").addEventListener("input", function () {
        permitirSoloLetras(this);
    });

    document.getElementById("estado").addEventListener("input", function () {
        permitirSoloLetras(this);
    });

    document.getElementById("semestre").addEventListener("input", function () {
        permitirSoloNumeros(this);
    });
};

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "index.html";
}

function guardarCurso() {
    if (cursoEnEdicion == null) {
        guardarCursoNuevo();
    } else {
        actualizarCursoExistente();
    }
}

function guardarCursoNuevo() {
    const facultad = document.getElementById("facultad").value.trim();
    const modalidad = document.getElementById("modalidad").value.trim().toLowerCase();
    const semestre = parseInt(document.getElementById("semestre").value.trim());
    const estado = document.getElementById("estado").value.trim().toLowerCase();

    const estadosValidos = ["activa", "inactiva"];
    const modalidadesValidas = ["presencial", "virtual", "híbrida", "hibrida"];

    if (!facultad || !modalidad || !estado || isNaN(semestre)) {
        alert("Por favor ingrese todos los datos.");
        return;
    }

    if (!estadosValidos.includes(estado)) {
        alert("Ingrese un estado válido: activa o inactiva.");
        return;
    }

    if (!modalidadesValidas.includes(modalidad)) {
        alert("Ingrese una modalidad válida: presencial, virtual o híbrida.");
        return;
    }

    if (semestre < 8 || semestre > 10) {
        alert("El número de semestres debe estar entre 8 y 10.");
        return;
    }

    const nuevoCurso = new Curso(facultad, modalidad, semestre, estado);
    cursos.push(nuevoCurso);
    agregarCursosATabla(nuevoCurso, cursos.length);
    limpiarFormulario();
}

function agregarCursosATabla(curso, index) {
    const tbody = document.getElementById("tabla-cursos");
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${index}</td>
        <td>${curso.facultad}</td>
        <td>${curso.modalidad}</td>
        <td>${curso.semestre}</td>
        <td>${curso.estado}</td>
        <td>
            <button class="btn-editar">Editar</button>
            <button class="btn-eliminar">Eliminar</button>
        </td>
    `;

    fila.querySelector(".btn-eliminar").addEventListener("click", () => {
        eliminarCurso(index - 1);
    });

    fila.querySelector(".btn-editar").addEventListener("click", () => {
        mostrarCursoACampos(index - 1);
    });

    tbody.appendChild(fila);
}

function limpiarFormulario() {
    document.getElementById("facultad").value = "";
    document.getElementById("modalidad").value = "";
    document.getElementById("semestre").value = "";
    document.getElementById("estado").value = "";
    cursoEnEdicion = null;
    document.querySelector(".btn-guardar").textContent = "Guardar";
}

function eliminarCurso(indice) {
    if (confirm("¿Estás seguro de que deseas eliminar el registro?")) {
        cursos.splice(indice, 1);
        document.getElementById("tabla-cursos").innerHTML = "";
        cursos.forEach((curso, i) => {
            agregarCursosATabla(curso, i + 1);
        });
    }
}

function mostrarCursoACampos(indice) {
    const curso = cursos[indice];
    document.getElementById("facultad").value = curso.facultad;
    document.getElementById("modalidad").value = curso.modalidad;
    document.getElementById("semestre").value = curso.semestre;
    document.getElementById("estado").value = curso.estado;
    cursoEnEdicion = indice;
    document.querySelector(".btn-guardar").textContent = "Actualizar";
}

function actualizarCursoExistente() {
    const facultad = document.getElementById("facultad").value.trim();
    const modalidad = document.getElementById("modalidad").value.trim().toLowerCase();
    const semestre = parseInt(document.getElementById("semestre").value.trim());
    const estado = document.getElementById("estado").value.trim().toLowerCase();

    const estadosValidos = ["activa", "inactiva"];
    const modalidadesValidas = ["presencial", "virtual", "híbrida", "hibrida"];

    if (!facultad || !modalidad || !estado || isNaN(semestre)) {
        alert("Por favor ingrese todos los datos.");
        return;
    }

    if (!estadosValidos.includes(estado)) {
        alert("Ingrese un estado válido: activa o inactiva.");
        return;
    }

    if (!modalidadesValidas.includes(modalidad)) {
        alert("Ingrese una modalidad válida: presencial, virtual o híbrida.");
        return;
    }

    if (semestre < 1 || semestre > 10) {
        alert("El número de semestres debe estar entre 1 y 10.");
        return;
    }

    cursos[cursoEnEdicion].facultad = facultad;
    cursos[cursoEnEdicion].modalidad = modalidad;
    cursos[cursoEnEdicion].semestre = semestre;
    cursos[cursoEnEdicion].estado = estado;

    document.getElementById("tabla-cursos").innerHTML = "";
    cursos.forEach((curso, i) => agregarCursosATabla(curso, i + 1));

    limpiarFormulario();
}

// Validaciones
function permitirSoloLetras(input) {
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
}

function permitirSoloNumeros(input) {
    input.value = input.value.replace(/\D/g, "");
}

