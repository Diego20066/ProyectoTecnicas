class Curso {
    constructor(codigo, carrera, salario) {
        this.codigo = codigo;
        this.carrera = carrera;
        this.salario = salario;
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
    const codigo = document.getElementById("codigo").value.trim();
    const carrera = document.getElementById("carrera").value.trim();
    const salario = document.getElementById("salario").value.trim();

    if (!codigo || !carrera || !salario) {
        alert("Por favor ingrese datos");
        return;
    }

    const nuevoCurso = new Curso(codigo, carrera, salario);
    cursos.push(nuevoCurso);
    agregarCursosATabla(nuevoCurso, cursos.length);
    limpiarFormulario();
}

function agregarCursosATabla(curso, index) {
    const tbody = document.getElementById("tabla-cursos");
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${index}</td>
        <td>${curso.codigo}</td>
        <td>${curso.carrera}</td>
        <td>${curso.salario}</td>
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
    document.getElementById("codigo").value = "";
    document.getElementById("carrera").value = "";
    document.getElementById("salario").value = "";
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
    document.getElementById("codigo").value = curso.codigo;
    document.getElementById("carrera").value = curso.carrera;
    document.getElementById("salario").value = curso.salario;
    cursoEnEdicion = indice;
    document.querySelector(".btn-guardar").textContent = 'Actualizar';
}

function actualizarCursoExistente() {
    const codigo = document.getElementById("codigo").value.trim();
    const carrera = document.getElementById("carrera").value.trim();
    const salario = document.getElementById("salario").value.trim();

    if (!codigo || !carrera || !salario) {
        alert("Por favor ingrese datos");
        return;
    }

    cursos[cursoEnEdicion].codigo = codigo;
    cursos[cursoEnEdicion].carrera = carrera;
    cursos[cursoEnEdicion].salario = salario;

    document.getElementById("tabla-cursos").innerHTML = "";
    cursos.forEach((curso, i) => agregarCursosATabla(curso, i + 1));

    limpiarFormulario();
    document.querySelector(".btn-guardar").textContent = "Guardar";
    cursoEnEdicion = null;
}
