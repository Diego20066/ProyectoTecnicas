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

function guardarCurso() {
    if (cursoEnEdicion == null) {
        guardarCursoNuevo();
    } else {
        actualizarCursoExistente();
    }
}

function guardarCursoNuevo() {
    const facultad = document.getElementById("facultad").value.trim();
    const modalidad = document.getElementById("modalidad").value.trim();
    const semestre = parseInt(document.getElementById("semestre").value.trim());
    const estado = document.getElementById("estado").value.trim();

    if (!facultad || !modalidad || !estado || isNaN(semestre)) {
        alert("Por favor ingrese todos los datos.");
        return;
    }

    if (semestre < 1 || semestre > 10) {
        alert("El número de semestres debe estar entre 1 y 10.");
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
    const modalidad = document.getElementById("modalidad").value.trim();
    const semestre = parseInt(document.getElementById("semestre").value.trim());
    const estado = document.getElementById("estado").value.trim();

    if (!facultad || !modalidad || !estado || isNaN(semestre)) {
        alert("Por favor ingrese todos los datos.");
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
