class Curso {
    constructor(facultad, modalidad, estado) {
        this.facultad = facultad;
        this.modalidad = modalidad;
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
    const estado = document.getElementById("estado").value.trim();

    if (!facultad || !modalidad || !estado) {
        alert("Por favor ingrese datos");
        return;
    }

    const nuevoCurso = new Curso(facultad, modalidad, estado);
    cursos.push(nuevoCurso);
    agregarCursosATabla(nuevoCurso, cursos.length);
    limpiarFormulario();
}

function agregarCursosATabla(curso, index) {
    const tbody = document.getElementById("tabla-cursos");
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${index + 5}</td>
        <td>${curso.facultad}</td>
        <td>${curso.modalidad}</td>
        <td>${curso.estado}</td>
        <td>
            <button class="btn-editar">editar</button>
            <button class="btn-eliminar">eliminar</button>
        </td>
    `;

    fila.querySelector(".btn-eliminar").addEventListener("click", () => {
        eliminarCurso(index - 1);
    });

    fila.querySelector(".btn-editar").addEventListener("click", () => {
        mostrarCursoAcampos(index - 1);
    });

    tbody.appendChild(fila);
}

function limpiarFormulario() {
    document.getElementById("facultad").value = "";
    document.getElementById("modalidad").value = "";
    document.getElementById("estado").value = "";
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

function mostrarCursoAcampos(indice) {
    const curso = cursos[indice];
    document.getElementById("facultad").value = curso.facultad;
    document.getElementById("modalidad").value = curso.modalidad;
    document.getElementById("estado").value = curso.estado;
    cursoEnEdicion = indice;
    document.querySelector(".btn-guardar").textContent = 'Actualizar';
}

function actualizarCursoExistente() {
    const facultad = document.getElementById("facultad").value.trim();
    const modalidad = document.getElementById("modalidad").value.trim();
    const estado = document.getElementById("estado").value.trim();

    if (!facultad || !modalidad || !estado) {
        alert("Por favor ingrese datos");
        return;
    }

    cursos[cursoEnEdicion].facultad = facultad;
    cursos[cursoEnEdicion].modalidad = modalidad;
    cursos[cursoEnEdicion].estado = estado;

    document.getElementById("tabla-cursos").innerHTML = "";
    cursos.forEach((curso, i) => agregarCursosATabla(curso, i + 1));

    limpiarFormulario();
    document.querySelector(".btn-guardar").textContent = "Guardar";
    cursoEnEdicion = null;
}
