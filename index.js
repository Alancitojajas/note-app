document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.querySelector(".contenedor");
  const formulario = document.querySelector(".formulario");

  let notas = [];

  sincronizarStorage();

  document
    .getElementById("abrirVentana")
    .addEventListener("click", function () {
      document.getElementById("miVentana").style.display = "block";
    });

  document.getElementById("cerrarVentana").addEventListener("click", () => {
    cerrarVentana();
    formulario.reset();
  });

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    obtenerValores();
  });

  function cerrarVentana() {
    document.getElementById("miVentana").style.display = "none";
  }

  function agregarNota(setTitulo, setDesc) {
     // Creando la card
  const card = document.createElement("div");
  card.classList.add("card");

  const titulo = document.createElement("p");
  titulo.classList.add("titulo");
  titulo.textContent = setTitulo;

  const descripcion = document.createElement("textarea");
  descripcion.classList.add("descripcion");
  descripcion.textContent = setDesc;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.classList.add("opcion", "eliminar");

  // Agregar evento de eliminación
  btnEliminar.addEventListener("click", function () {
    eliminarNota(card, setTitulo);
  });

  // Armar la nota
  card.appendChild(titulo);
  card.appendChild(descripcion);
  card.appendChild(btnEliminar);

  //almacenar en localstorage
  almacenarNota(Date.now(), setTitulo, setDesc);

  // Agregarla al contenedor
  contenedor.appendChild(card);
  }

  function obtenerValores() {
    const setTitulo = document.querySelector(".tituloInput").value;
    const setDesc = document.querySelector(".descripcionInput").value;
    if (setTitulo === "" || setDesc === "") {
      const alerta = document.querySelector(".alerta");
      if (!alerta) {
        mostrarAlerta("Ingresa un titulo y descripcion");
      }
      return;
    }
    agregarNota(setTitulo, setDesc);
    formulario.reset();
    cerrarVentana();
  }

  function mostrarAlerta(descripcion) {
    const alerta = document.createElement("p");
    alerta.textContent = descripcion;
    alerta.classList.add("alerta");
    formulario.appendChild(alerta);
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }

  function almacenarNota(id, titulo, descripcion) {
    const nota = {
      id,
      titulo,
      descripcion,
    };
    // Obtener las notas existentes desde el Local Storage
    const notasStorage = JSON.parse(localStorage.getItem("Notas")) || [];

    // Agregar la nueva nota al array existente
    const nuevasNotas = [...notasStorage, nota];

    // Almacenar el array actualizado en el Local Storage
    localStorage.setItem("Notas", JSON.stringify(nuevasNotas));

    // Actualizar el array 'notas' con las nuevas notas
    notas = nuevasNotas;
  }

  function sincronizarStorage() {
    // Obtener las notas desde el Local Storage y mostrarlas en la consola
    notas = JSON.parse(localStorage.getItem("Notas")) || [];

    contenedor.innerHTML = "";

    notas.forEach((nota) => {
      const { titulo, descripcion } = nota;
      // Creando la card
      const card = document.createElement("div");
      card.classList.add("card");

      const tituloNota = document.createElement("p");
      tituloNota.classList.add("titulo");
      tituloNota.textContent = titulo;

      const descripcionNota = document.createElement("textarea");
      descripcionNota.classList.add("descripcion");
      descripcionNota.textContent = descripcion;
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.classList.add("opcion", "eliminar");

      // Armar la nota
      card.appendChild(tituloNota);
      card.appendChild(descripcionNota);
      card.appendChild(btnEliminar);
      // Agregarla al contenedor
      contenedor.appendChild(card);
    });
  }

  function eliminarNota(card, titulo) {
  // Eliminar la nota del contenedor
  contenedor.removeChild(card);

  // Filtrar las notas para excluir la que tiene el título proporcionado
  notas = notas.filter((nota) => nota.titulo !== titulo);

  // Actualizar el Local Storage con las notas filtradas
  localStorage.setItem("Notas", JSON.stringify(notas));
  }
});
