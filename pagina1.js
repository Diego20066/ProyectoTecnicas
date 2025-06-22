//por cada entidad: ej:persona roca crear una clase consctrutura
/*
/*Sirve para crear datos de tipo objeto 

para cada elemento poner this y relacionar con ada uno 
*/

//Es una plantilla
class Curso{
    constructor(codigo, nombre, creditos){
        this.codigo = codigo;
        this.nombre = nombre,
        this.creditos = creditos
    }
}
/*Debemos guardar cada dato en un arreglo*/

let cursos =[]
let cursoEnEdicion = null
function guardarCurso(){
    if(cursoEnEdicion== null){ 
        guardarCursoNuevo();          
    }else{
        // funcion para actualizar
        actualizarCursoExistente();
    }
}
/*Función para guardar curso*/
function guardarCursoNuevo(){
    //input codigo ->como no esta asginado asignar al html
    const codigo = document.getElementById("codigo").value .trim()
    const nombre = document.getElementById("nombre").value .trim()
    const creditos = document.getElementById("creditos").value .trim()

    /*trim para validar espacios*/

    if (!codigo || !nombre ||!creditos){
        alert("Por favor ingrese datos")
        return;

    }
    /*SE CREO UN NUEVO OBJETO DE TIPO CURSO*/ 

    const nuevoCurso = new Curso(codigo, nombre, creditos)
    cursos.push(nuevoCurso)
    agregarCursosATabla(nuevoCurso, cursos.length)
    limpiarFormulario();
}


function agregarCursosATabla(curso, index){
    //Obtener la tabla
    const tbody = document.getElementById("tabla-cursos")
   const fila = document.createElement("tr")
   fila.innerHTML = `
        <td>${index + 5}</td>
             <td>${curso.codigo}</td>
            <td>${curso.nombre}</td>
            <td>${curso.creditos}</td>
            <td>
                <button class="btn-editar" >editar</button>
                <button class="btn-eliminar">eliminar</button>
             </td>
   `;
   /*addEventListener: ecucha los eventos realizados: clics, movimientos de mouse, al teclear*/
   fila.querySelector(".btn-eliminar").addEventListener("click",()=>{
         eliminarCurso(index - 1);
   })
   tbody .appendChild(fila);
   fila.querySelector(".btn-editar").addEventListener("click",()=>{
         mostrarCursoAcampos(index-1)
   })
}


function limpiarFormulario() {
    document.getElementById("codigo").value = ""
    document.getElementById("nombre").value = ""
    document.getElementById("creditos").value = ""
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
function mostrarCursoAcampos(indice){
    const curso = cursos[indice]
    document.getElementById("codigo").value = curso.codigo
    document.getElementById("nombre").value = curso.nombre
    document.getElementById("creditos").value = curso.creditos
    cursoEnEdicion = indice;
    document.querySelector(".btn-guardar").textContent = 'Actualizar'
}
function actualizarCursoExistente(){
    const codigo = document.getElementById("codigo").value .trim()
    const nombre = document.getElementById("nombre").value .trim()
    const creditos = document.getElementById("creditos").value .trim()
    if(!codigo || !nombre || !creditos){
        alert("Por favor ingrese datos")
        return
    }
    cursos[cursoEnEdicion].codigo = codigo;
    cursos[cursoEnEdicion].nombre = nombre;
    cursos[cursoEnEdicion].creditos = creditos;

    document.getElementById("tabla-cursos").innerHTML = ""
    cursos.forEach((curso,i)=> agregarCursosATabla(curso,i+1))

    limpiarFormulario()
    document.querySelector(".btn-guardar").textContent = "Guardar"
    cursoEnEdicion = null
    
}




