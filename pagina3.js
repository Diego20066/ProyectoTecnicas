class Curso {
    constructor(modelo, marca, precio) {
        this.modelo = modelo;
        this.marca = marca;
        this.precio = precio;
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
    const modelo = document.getElementById("modelo").value.trim();
    const marca = document.getElementById("marca").value.trim();
    const precio = document.getElementById("precio").value.trim();

    if (!modelo || !marca || !precio) {
        alert("Por favor ingrese datos");
        return;
    }

    const nuevoCurso = new Curso(modelo, marca, precio);
    cursos.push(nuevoCurso);
    agregarCursosATabla(nuevoCurso, cursos.length);
    limpiarFormulario();
}

function agregarCursosATabla(curso, index) {
    const tbody = document.getElementById("tabla-cursos");
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${index + 5}</td>
        <td>${curso.modelo}</td>
        <td>${curso.marca}</td>
        <td>${curso.precio}</td>
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
    document.getElementById("modelo").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("precio").value = "";
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
    document.getElementById("modelo").value = curso.modelo;
    document.getElementById("marca").value = curso.marca;
    document.getElementById("precio").value = curso.precio;
    cursoEnEdicion = indice;
    document.querySelector(".btn-guardar").textContent = 'Actualizar';
}

function actualizarCursoExistente() {
    const modelo = document.getElementById("modelo").value.trim();
    const marca = document.getElementById("marca").value.trim();
    const precio = document.getElementById("precio").value.trim();

    if (!modelo || !marca || !precio) {
        alert("Por favor ingrese datos");
        return;
    }

    cursos[cursoEnEdicion].modelo = modelo;
    cursos[cursoEnEdicion].marca = marca;
    cursos[cursoEnEdicion].precio = precio;

    document.getElementById("tabla-cursos").innerHTML = "";
    cursos.forEach((curso, i) => agregarCursosATabla(curso, i + 1));

    limpiarFormulario();
    document.querySelector(".btn-guardar").textContent = "Guardar";
    cursoEnEdicion = null;
}


