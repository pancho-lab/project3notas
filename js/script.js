// Generar codigo alfanumerico

function generarId(length) {
    var id = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var caracteresLength = caracteres.length;
    for (var i = 0; i < length; i++) {
        id += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    }
    return id;
}

// Generador de clases

class NewNote {
    constructor(id, titulo, categoria, contenido, fecha) {
        this.id = id;
        this.titulo = titulo;
        this.categoria = categoria;
        this.contenido = contenido;
        this.fecha = fecha;
    }
}

// Crear Notas

function nuevaNota() {
    
    let notas = JSON.parse(localStorage.getItem("notas"))

    if (!notas) {
        notas = []
    }

    let id = generarId(20)

    if (id === notas.id) {
        alert("Intenta de nuevo, el codigo se repitio")
    }

    document.getElementById("titulo").focus();

    let titulo = document.getElementById("titulo")
    let categoria = document.getElementById("selectcategorias") // este se tiene que sacar una lista creada anteriormente
    let contenido = document.getElementById("contenido")
    let fecha = new Date().toLocaleString()
    let nuevaNota = new NewNote(id, titulo.value, categoria.value, contenido.value, fecha)
    console.log(fecha)

    if (titulo.value != "" && contenido.value != "" && categoria.value != "Elegi una categoria") {

        notas.push(nuevaNota);
        console.log(notas)
        localStorage.setItem("notas", JSON.stringify(notas))

        titulo.value = ""
        categoria.value = ""
        contenido.value = ""
        fecha = ""

        console.log(titulo.value, categoria.value, contenido.value)

        mostrarNotas()
    } else {
        alert("Faltan rellenar campos.")
    }

}

// Mostrar Notas 

function mostrarNotas(notas = null) {

    if (notas == null) {
        
        notas = JSON.parse(localStorage.getItem("notas"))
        console.log(notas)
    
        if (!notas) {
            notas = []
        }
        
    }
    

    let divNotas = ""

    for (let i = 0; i < notas.length; i++) {

        let nota = notas[i];
        console.log(nota.id)
        divNotas += `<div id="${nota.id}" class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <h4 class="m-3">${nota.titulo}</h4>
                            <div class="card-body">
                                <p class="card-text">${nota.contenido}</p>
                                <p class="card-text">Categoria: ${nota.categoria}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" id="${nota.id}" onclick="editarNotas('${nota.id}')" class="btn btn-sm btn-outline-secondary">Editar</button>
                                        <button type="button" onclick="eliminarNotas('${nota.id}')" class="btn btn-sm btn-outline-secondary">Elimnar</button>
                                    </div>
                                    <small class="text-muted">${nota.fecha}</small>
                                </div>    
                            </div>
                        </div>
                    </div>`
    }
    
    document.getElementById("notas").innerHTML = divNotas
}

class NewCategoria {
    constructor(nombre, id /* color */ ) {
        this.nombre = nombre;
        this.id = id;
        /*  this.color = color */
    }
}

// Funciona para crear categoria

function nuevaCategoria() {

    let categorias = JSON.parse(localStorage.getItem("categorias"))
    console.log(categorias)


    if (!categorias) {
        categorias = []
    }

    let id = generarId(20)

    if (id === categorias.id) {
        alert("Intenta de nuevo, el codigo se repitio")
    }

    let nombre = document.getElementById("categoria")
    console.log(nombre.value)
    /* let color = document.getElementById("color") */

    let nuevaCategoria = new NewCategoria(nombre.value, id /* , color.value */ )

    if (nombre != "" && nombre.value.length < 31  && id != "" ) {

        categorias.push(nuevaCategoria)
        localStorage.setItem("categorias", JSON.stringify(categorias))
        nombre.value = ""
        id = ""
        mostrarCategorias()
    
    } else if (nombre.value.length > 30){
        alert("La caterogia no puede tener mas de 30 caracteres")
    }

}


// Funcion para mostrar los contactos

function mostrarCategorias() {

    let categorias = JSON.parse(localStorage.getItem("categorias"))

    if (!categorias) {
        categorias = []
    }

    let tablaCategorias = ""

    for (let i = 0; i < categorias.length; i++) {

        let categoria = categorias[i]
        console.log(categoria.nombre)
        tablaCategorias += `<tr id="${categoria.id}"><td>${categoria.nombre}</td><td><button type="button" onclick="modificarCategorias('${categoria.id}')" class="btn btn-warning">Modificar</button></td><td><button type="button" onclick="eliminarCategorias('${categoria.id}')" class="btn btn-danger">Eliminar</button></td></tr>`
    }

    document.getElementById("listacategorias").innerHTML = tablaCategorias


}

// Funcion para selecionar categoria al agregar nota

function selectCategorias() {

    let categorias = JSON.parse(localStorage.getItem("categorias"))

    if (!categorias) {
        categorias = []
    }

    let listado = '<option select>Elige una categoria</option>'

    for (let i = 0; i < categorias.length; i++) {
        let categoria = categorias[i]

        listado += '<option>' + categoria.nombre + '</option>'
    }

    document.getElementById("selectcategorias").innerHTML = listado

}

// Funcion para modificar Notas

function eliminarNotas(idNotas) {
    let notas = JSON.parse(localStorage.getItem("notas"))
    
    let idNote = notas.findIndex( nota => nota.id == idNotas)

    notas.splice(idNote,1)

    localStorage.setItem("notas",JSON.stringify(notas))

    mostrarNotas()

}


function editarNotas(idNotas) {

    let notas = JSON.parse(localStorage.getItem("notas"))
    console.log(notas)

    if (!notas) {
        notas = []
    }

    let divNotas = ""
    let idNote = notas.findIndex( nota => nota.id == idNotas)
    console.log(idNote)


        let nota = notas[idNote];
        console.log(notas[idNote].id)
        divNotas += `<div id="${nota.id}" class="col-md-4">
                        <div class="card pb-4 shadow-sm">
                            <label>Titulo: <input type="text" value="${nota.titulo}" id="${nota.id} titulo" class="p-3"><label>
                            <label>Texto: <input type="text" class="p-3" id="${nota.id} contenido" value="${nota.contenido}"><label>
                            <div class="card-body">
                                <p class="card-text pt-3">Categoria: ${nota.categoria}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group p-3">
                                        <button type="button" id="${nota.id}" onclick="aceptarModificacion('${nota.id}')" class="btn btn-sm btn-outline-secondary">Aceptar</button>
                                        <button type="button" onclick="mostrarNotas('${nota.id}')" class="btn btn-sm btn-outline-secondary">Cancelar</button>
                                    </div>
                                    <small class="text-muted">${nota.fecha}</small>
                                </div>    
                            </div>
                        </div>
                    </div>`
    
    document.getElementById("notas").innerHTML = divNotas
    

}

function aceptarModificacion(idNotas) {
    
    let notas = JSON.parse(localStorage.getItem("notas"))
    console.log(notas)

    
    let idNote = notas.findIndex( nota => nota.id == idNotas)
    console.log(idNote)

    notas[idNote].titulo = document.getElementById(idNotas+' titulo').value
    notas[idNote].contenido = document.getElementById(idNotas+' contenido').value
    notas[idNote].fecha = new Date().toLocaleString() 


    localStorage.setItem("notas",JSON.stringify(notas))

    mostrarNotas()

}

function eliminarCategorias(id) {
    
    let categorias = JSON.parse(localStorage.getItem("categorias"))
    console.log(categorias)
    console.log(id)
    
    let idCategoria = categorias.findIndex( categoria => categoria.id == id)

    categorias.splice(idCategoria,1)

    localStorage.setItem("categorias",JSON.stringify(categorias))

    mostrarCategorias()


}

function modificarCategorias(id) {
    
    let categorias = JSON.parse(localStorage.getItem("categorias"))
    console.log(categorias)

    if (!categorias) {
        categorias = []
    }

    let divCategorias = ""
    let idCategoria = categorias.findIndex( categoria => categoria.id == id)
    console.log(idCategoria)


    let categoria = categorias[idCategoria];
    console.log(categorias[idCategoria].id)
    
    divCategorias += `<tr id="">
                            <td><input type="text" id="${categoria.id} nombre" value="${categoria.nombre}"</td>
                            <td><button type="button" onclick="aceptarModificacionCategorias('${categoria.id}')" class="btn btn-warning">Aceptar</button></td>
                            <td><button type="button" onclick="mostrarCategorias()" class="btn btn-danger">Cancelar</button></td>
                          </tr>`
    
    
    document.getElementById(id).innerHTML = divCategorias

}

function aceptarModificacionCategorias(id) {
    
    let categorias = JSON.parse(localStorage.getItem("categorias"))
    console.log(categorias)

    
    let idCategoria = categorias.findIndex( categoria => categoria.id == id)
    console.log(idCategoria)

    
    categorias[idCategoria].nombre = document.getElementById(id+' nombre').value
    console.log(categorias[idCategoria])
    
    if (document.getElementById(id+' nombre').value.length < 31) {
        
        categorias[idCategoria].nombre = document.getElementById(id+' nombre').value

    } else {
        alert("La categoria no puede tener mas de 30 caracteres")
    }

    localStorage.setItem("categorias",JSON.stringify(categorias))

    mostrarCategorias()

}

function buscarNotas() {
    
    console.log(event);

    if (event.type == "submit") {
        event.preventDefault();
    }

    let txt = document.getElementById("text-buscar").value;
    console.log(txt)
    let notas = JSON.parse(localStorage.getItem('notas'));
    console.log(notas)
    
    // Controlo que se haya ingresado algo en el buscador
    // y que la agenda no este vacía
    if (txt && notas) {
        let notaFiltrada = notas.filter(nota => nota.titulo.toLowerCase().indexOf(txt.toLowerCase()) > -1);
        console.log(notaFiltrada)
        mostrarNotas(notaFiltrada);
    } else {
        mostrarNotas(notas);
        console.log(notas)
    }
}
