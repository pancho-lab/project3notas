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
    constructor (id, titulo, categoria, contenido) {
        this.id = id;
        this.titulo = titulo;
        this.categoria = categoria;
        this.contenido = contenido;
    }
}

// Crear Notas

function nuevaNota () {
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
    let categoria = document.getElementById("categoria") // este se tiene que sacar una lista creada anteriormente
    let contenido = document.getElementById("contenido")
    let nuevaNota = new NewNote(id,titulo.value,categoria,contenido.value)

    if (titulo != "" && contenido != "") {
        
        notas.push(nuevaNota);
        console.log(notas)
        localStorage.setItem("notas",JSON.stringify(notas))

        titulo.value = ""
        categoria.value = ""
        contenido.value = ""

        console.log(titulo.value,categoria.value,contenido.value)
    }

}

// Mostrar Notas 

function mostrarNotas () {
    let notas = JSON.parse(localStorage.getItem("notas"))
    console.log(notas)

    if (!notas) {
        notas = []
    }

    let divnotas = ""

    for (let i = 0; i < notas.length; i++) {

        let nota = notas[i];

        divnotas += '<div id="'+ nota.id +'" class="card m-3 w-50 h-50"> <h1> '+ nota.titulo + ' </h1> </div>'

    }

    document.getElementById("notas").innerHTML = divnotas
}