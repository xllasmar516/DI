"use strict";

// MAIN PROGRAM
var oPlataforma = new Plataforma();

registrarEventos();

// Registro de eventos
function registrarEventos() {
  // Opciones de menú
  document
    .querySelector("#mnuAltaEvento")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuAltaParticipante")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuBuscarEvento")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuBuscarParticipante")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuListadoEventos")
    .addEventListener("click", procesarListadoEventos);
  document
    .querySelector("#mnuListadoParticipantes")
    .addEventListener("click", procesarListadoParticipantes);
  document
    .querySelector("#mnuListadoPorFecha")
    .addEventListener("click", mostrarFormulario);
  document
    .querySelector("#mnuListadoPorEvento")
    .addEventListener("click", mostrarFormulario);

  // Botones
  document.querySelector("#logo").addEventListener("click", mostrarFormulario);
  frmAltaEvento.btnAceptarAltaEvento.addEventListener(
    "click",
    procesarAltaEvento
  );
  frmAltaParticipante.btnAceptarAltaParticipante.addEventListener(
    "click",
    procesarAltaParticipante
  );
  frmModEvento.btnAceptarModEvento.addEventListener("click", procesarModificarEvento);
  frmModParticipante.btnAceptarModParticipante.addEventListener(
    "click",
    procesarModificarParticipante
  );
  frmBuscarEvento.btnAceptarBuscarEvento.addEventListener(
    "click",
    procesarBuscarEvento
  );
  frmBuscarParticipante.btnAceptarBuscarParticipante.addEventListener(
    "click",
    procesarBuscarParticipante
  );
  frmEventosFecha.btnAceptarBuscarEventosFecha.addEventListener(
    "click",
    procesarListadoEventos
  );
  frmParticipantesEvento.btnAceptarBuscarParticipantesEvento.addEventListener(
    "click",
    procesarListadoParticipantes
  );
}

function mostrarFormulario(oEvento) {
  let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

  ocultarFormularios();

  switch (opcionMenu) {
    case "logo":
      document.querySelector("#landpage").classList.remove("d-none");
      break;
    case "mnuAltaEvento":
      frmAltaEvento.classList.remove("d-none");
      break;
    case "mnuAltaParticipante":
      frmAltaParticipante.classList.remove("d-none");
      actualizarDesplegableEventos(undefined);
      frmAltaParticipante.txtAltaInscripcionFecha.value = new Date()
        .toISOString()
        .split("T")[0];
      break;
    case "mnuBuscarEvento":
      frmBuscarEvento.classList.remove("d-none");
      break;
    case "mnuBuscarParticipante":
      frmBuscarParticipante.classList.remove("d-none");
      break;
    case "mnuListadoPorFecha":
      frmEventosFecha.classList.remove("d-none");
      break;
    case "mnuListadoPorEvento":
      frmParticipantesEvento.classList.remove("d-none");
      actualizarDesplegableEventos(undefined);
      break;
  }
}

function ocultarFormularios() {
  document.querySelector("#landpage").classList.add("d-none");
  frmAltaEvento.classList.add("d-none");
  frmAltaParticipante.classList.add("d-none");
  frmModParticipante.classList.add("d-none");
  frmModEvento.classList.add("d-none");
  frmBuscarEvento.classList.add("d-none");
  frmBuscarParticipante.classList.add("d-none");
  frmEventosFecha.classList.add("d-none");
  frmParticipantesEvento.classList.add("d-none");

  // Borrado del contenido de capas con resultados
  document.querySelector("#resultadoBusqueda").innerHTML = "";
  document.querySelector("#listados").innerHTML = "";
}

async function actualizarDesplegableEventos(idEventoSeleccionado) {
  let respuesta = await oPlataforma.getEventos();
  let options = "";

  for (let evento of respuesta.datos) {
    if (idEventoSeleccionado && idEventoSeleccionado == evento.evento_id) {
      // Si llega el parámetro ( != undefined )
      options +=
        "<option selected value='" +
        evento.evento_id +
        "' >" +
        evento.evento_nombre +
        "</option>";
    } else {
      options +=
        "<option value='" +
        evento.evento_id +
        "' >" +
        evento.evento_nombre +
        "</option>";
    }
  }
  // Agrego los options generados a partir del contenido de la BD
  // Aprovecho y actualizo todos los desplegables se vea o no el formulario
  frmParticipantesEvento.lstEventoP.innerHTML = options;
  frmModParticipante.lstModEvento.innerHTML = options;
  frmAltaParticipante.lstAltaEvento.innerHTML = options;
}

async function procesarAltaEvento() {
  if (validarAltaEvento()) {
    let nombre = frmAltaEvento.txtAltaNombreE.value.trim();
    let descripcion = frmAltaEvento.txtAltaDescripcion.value.trim();
    let imagen = frmAltaEvento.urlAltaImagen.value.trim();
    let fecha = frmAltaEvento.txtAltaFecha.value.trim();
    let localizacion = frmAltaEvento.txtAltaLocalizacion.value.trim();
    let organizador = frmAltaEvento.txtAltaOrganizador.value.trim();

    let respuesta = await oPlataforma.altaEvento(
      new Evento(
        null,
        nombre,
        descripcion,
        imagen,
        fecha,
        localizacion,
        organizador
      )
    );

    alert(respuesta.mensaje);
    // Si NO hay error
    //Resetear formulario
    frmAltaEvento.reset();
    // Ocultar el formulario
    ocultarFormularios();
  }
}

function validarAltaEvento() {
  let nombre = frmAltaEvento.txtAltaNombreE.value.trim();
  let descripcion = frmAltaEvento.txtAltaDescripcion.value.trim();
  let imagen = frmAltaEvento.urlAltaImagen.value.trim();
  let fecha = frmAltaEvento.txtAltaFecha.value.trim();
  let localizacion = frmAltaEvento.txtAltaLocalizacion.value.trim();
  let organizador = frmAltaEvento.txtAltaOrganizador.value.trim();
  let valido = true;
  let errores = "";

  if (
    nombre.length == 0 ||
    descripcion.length == 0 ||
    imagen.length == 0 ||
    fecha.length == 0 ||
    localizacion.length == 0 ||
    organizador.length == 0
  ) {
    valido = false;
    errores += "Faltan datos por rellenar. ";
  } else {
    const fechaIngresada = new Date(fecha);
    const hoy = new Date();

    // Limpiamos la hora para que la comparación sea solo de fecha
    hoy.setHours(0, 0, 0, 0);

    if (!(fechaIngresada > hoy)) {
      valido = false;
      errores += "La fecha introducida debe ser posterior a hoy. ";
    }
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

async function procesarAltaParticipante() {
  // Recuperar datos del formulario frmAltaParticipante
  let nombre = frmAltaParticipante.txtAltaNombreP.value.trim();
  let email = frmAltaParticipante.txtAltaEmail.value.trim();
  let eventoid = frmAltaParticipante.lstAltaEvento.value.trim();
  let inscripcionEstado =
    frmAltaParticipante.lstAltaInscripcionEstado.value.trim();
  let acompanantes = parseInt(
    frmAltaParticipante.txtAltaAcompanantes.value.trim()
  );
  let inscripcionFecha =
    frmAltaParticipante.txtAltaInscripcionFecha.value.trim();

  // Validar datos del formulario
  if (validarAltaParticipante()) {
    let respuesta = await oPlataforma.altaParticipante(
      new Participante(
        null,
        nombre,
        email,
        eventoid,
        inscripcionEstado,
        acompanantes,
        inscripcionFecha
      )
    );
    alert(respuesta.mensaje);

    if (!respuesta.error) {
      // Si NO hay error
      //Resetear formulario
      frmAltaParticipante.reset();
      // Ocultar el formulario
      ocultarFormularios();
    }
  }
}

function validarAltaParticipante() {
  // Recuperar datos del formulario frmModificarParticipante
  let nombre = frmAltaParticipante.txtAltaNombreP.value.trim();
  let email = frmAltaParticipante.txtAltaEmail.value.trim();
  let acompanantes = parseInt(
    frmAltaParticipante.txtAltaAcompanantes.value.trim()
  );

  let valido = true;
  let errores = "";

  if (nombre.length == 0 || email.length == 0) {
    valido = false;
    errores += "El nombre y el email no pueden estar vacíos. /n";
  }

  if (acompanantes > 10) {
    valido = false;
    errores += "El número de acompañantes no puede ser mayor que 10. /n";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

async function procesarListadoEventos(oEvento) {
  ocultarFormularios();
  let listado = "";
  let respuesta = null;
  if (oEvento.target.id == "btnAceptarBuscarEventosFecha") {
    let fecha = frmEventosFecha.txtFechaEvento.value;
    respuesta = await oPlataforma.listadoPorFecha(
      fecha
    );
  } else {
    respuesta = await oPlataforma.listadoEventos();
  }
  if (!respuesta.ok) {
    listado = respuesta.mensaje;
  } else {
    listado = "<table class='table table-striped'>";
    listado +=
      "<thead><tr><th>EVENTOID</th><th>NOMBRE</th><th>DESCRIPCIÓN</th><th>IMAGEN</th><th>FECHA</th><th>LOCALIZACIÓN</th><th>ORGANIZADOR</th><th>EDITAR/BORRAR</th></tr></thead>";
    listado += "<tbody>";

    for (let evento of respuesta.datos) {
      listado += "<tr><td>" + evento.evento_id + "</td>";
      listado += "<td>" + evento.evento_nombre + "</td>";
      listado += "<td>" + evento.evento_descripcion + "</td>";
      listado +=
        "<td><img height='75' src='" + evento.evento_imagen + "'/></td>";
      listado += "<td>" + evento.evento_fecha + "</td>";
      listado += "<td>" + evento.evento_localizacion + "</td>";
      listado += "<td>" + evento.evento_organizador + "</td>";
      listado +=
        "<td><button class='btn btn-danger' id='btnBorrarEvento" + evento.evento_id + "' data-eventoid='" +
        evento.evento_id +
        "'><i class='bi bi-trash'></i></button>";
      listado +=
        "<button class='btn btn-primary' id='btnModEvento" + evento.evento_id + "' data-evento='" +
        JSON.stringify(evento) +
        "'><i class='bi bi-pencil-square'></i></button></td></tr>";
    }
    listado += "</tbody></table>";
  }

  document.querySelector("#listados").innerHTML = listado;
  for (let evento of respuesta.datos) {
    // Registrar evento para el botón borrar
    document
      .querySelector("#btnBorrarEvento" + evento.evento_id)
      .addEventListener("click", borrarEvento);
    document
      .querySelector("#btnModEvento" + evento.evento_id)
      .addEventListener("click", procesarBotonEditarEvento);
  }
}

async function procesarListadoParticipantes(oEvento) {
  ocultarFormularios();
  let listado = "";
  let respuesta = null;
  if (oEvento.target.id == "btnAceptarBuscarParticipantesEvento") {
    respuesta = await oPlataforma.listadoPorEvento(
      frmParticipantesEvento.lstEventoP.value
    );
  } else {
    respuesta = await oPlataforma.listadoParticipantes();
  }
  if (!respuesta.ok) {
    listado = respuesta.mensaje;
  } else {
    listado = "<table class='table table-striped'>";
    listado +=
      "<thead><tr><th>PARTICIPANTEID</th><th>NOMBRE</th><th>EMAIL</th><th>EVENTO</th><th>ESTADO INSCRIPCIÓN</th><th>Nº ACOMPAÑANTES</th><th>FECHA INSCRIPCIÓN</th><th>EDITAR/BORRAR</th></tr></thead>";
    listado += "<tbody>";

    for (let participante of respuesta.datos) {
      listado += "<tr><td>" + participante.participante_id + "</td>";
      listado += "<td>" + participante.participante_nombre + "</td>";
      listado += "<td>" + participante.participante_email + "</td>";
      listado += "<td>" + participante.evento + "</td>";
      listado += "<td>" + participante.inscripcion_estado + "</td>";
      listado += "<td>" + participante.numero_acompanantes + "</td>";
      listado += "<td>" + participante.inscripcion_fecha + "</td>";
      listado +=
        "<td><button class='btn btn-danger' id='btnBorrarParticipante" +
        participante.participante_id +
        "' data-idparticipante='" +
        participante.participante_id +
        "'><i class='bi bi-trash'></i></button>";
      listado +=
        "<button class='btn btn-primary' id='btnModParticipante" +
        participante.participante_id +
        "' data-participante='" +
        JSON.stringify(participante) +
        "'><i class='bi bi-pencil-square'></i></button></td></tr>";
    }
    listado += "</tbody></table>";
  }

  document.querySelector("#listados").innerHTML = listado;
  for (let participante of respuesta.datos) {
    // Registrar evento para el botón borrar
    document
      .querySelector("#btnBorrarParticipante" + participante.participante_id)
      .addEventListener("click", borrarParticipante);
    document
      .querySelector("#btnModParticipante" + participante.participante_id)
      .addEventListener("click", procesarBotonEditarParticipante);
  }
}

function procesarBotonEditarEvento(oEvento) {
  let boton = null;

  // Verificamos si han hecho clic sobre el botón o el icono
  if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "BUTTON") {
    if (oEvento.target.nodeName == "I") {
      // Pulsacion sobre el icono
      boton = oEvento.target.parentElement; // El padre es el boton
    } else {
      boton = oEvento.target;
    }

    // 1.Ocultar todos los formularios
    ocultarFormularios();
    // 2.Mostrar el formulario de modificación de eventos
    frmModEvento.classList.remove("d-none");
    // 3. Rellenar los datos de este formulario con los del evento
    let evento = JSON.parse(boton.dataset.evento);
    let fechaFormateada = new Date(evento.evento_fecha).toISOString().split("T")[0];
    frmModEvento.txtModIdEvento.value = evento.evento_id;
    frmModEvento.txtModNombreE.value = evento.evento_nombre;
    frmModEvento.txtModDescripcion.value = evento.evento_descripcion;
    frmModEvento.urlModImagen.value = evento.evento_imagen;
    frmModEvento.txtModFecha.value = fechaFormateada;
    frmModEvento.txtModLocalizacion.value = evento.evento_localizacion;
    frmModEvento.txtModOrganizador.value = evento.evento_organizador;
  }
}

async function procesarModificarEvento() {
  let eventoid = frmModEvento.txtModIdEvento.value;
  let nombre = frmModEvento.txtModNombreE.value.trim();
  let descripcion = frmModEvento.txtModDescripcion.value.trim();
  let imagen = frmModEvento.urlModImagen.value.trim();
  let fecha = frmModEvento.txtModFecha.value;
  let localizacion = frmModEvento.txtModLocalizacion.value.trim();
  let organizador = frmModEvento.txtModOrganizador.value.trim();

  // Validar datos del formulario
  if (validarModEvento()) {
    let respuesta = await oPlataforma.modificarEvento(
      new Evento(
        eventoid,
        nombre,
        descripcion,
        imagen,
        fecha,
        localizacion,
        organizador
      )
    );

    alert(respuesta.mensaje);

    if (!respuesta.error) {
      // Si NO hay error
      //Resetear formulario
      frmModEvento.reset();
      // Ocultar el formulario
      frmModEvento.classList.add("d-none");
    }
  }
}

function validarModEvento() {
  // Recuperar datos del formulario 
  let nombre = frmModEvento.txtModNombreE.value.trim();
  let descripcion = frmModEvento.txtModDescripcion.value.trim();
  let imagen = frmModEvento.urlModImagen.value.trim();
  let fecha = frmModEvento.txtModFecha.value.trim();
  let localizacion = frmModEvento.txtModLocalizacion.value.trim();
  let organizador = frmModEvento.txtModOrganizador.value.trim();
  let valido = true;
  let errores = "";

  if (
    nombre.length == 0 ||
    descripcion.length == 0 ||
    imagen.length == 0 ||
    localizacion.length == 0 ||
    organizador.length == 0
  ) {
    valido = false;
    errores += "Faltan datos por rellenar. ";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

function procesarBotonEditarParticipante(oEvento) {
  let boton = null;

  // Verificamos si han hecho clic sobre el botón o el icono
  if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "BUTTON") {
    if (oEvento.target.nodeName == "I") {
      // Pulsacion sobre el icono
      boton = oEvento.target.parentElement; // El padre es el boton
    } else {
      boton = oEvento.target;
    }

    // 1.Ocultar todos los formularios
    ocultarFormularios();
    // 2.Mostrar el formulario de modificación de participantes
    frmModParticipante.classList.remove("d-none");
    // 3. Rellenar los datos de este formulario con los del participante
    let participante = JSON.parse(boton.dataset.participante);

    frmModParticipante.txtModIdParticipante.value =
      participante.participante_id;
    frmModParticipante.txtModNombreP.value = participante.participante_nombre;
    frmModParticipante.txtModEmail.value = participante.participante_email;
    frmModParticipante.lstModInscripcionEstado.value =
      participante.inscripcion_estado;

    frmModParticipante.txtModAcompanantes.value =
      participante.numero_acompanantes;
    actualizarDesplegableEventos(participante.evento);
  }
}

async function procesarModificarParticipante() {
  let idparticipante = frmModParticipante.txtModIdParticipante.value.trim();
  let nombre = frmModParticipante.txtModNombreP.value.trim();
  let email = frmModParticipante.txtModEmail.value.trim();
  let eventoid = frmModParticipante.lstModEvento.value;
  let inscripcionEstado = frmModParticipante.lstModInscripcionEstado.value;
  let acompanantes = parseInt(
    frmModParticipante.txtModAcompanantes.value.trim()
  );
  let inscripcionFecha = "";

  // Validar datos del formulario
  if (validarModParticipante()) {
    let respuesta = await oPlataforma.modificarParticipante(
      new Participante(
        idparticipante,
        nombre,
        email,
        eventoid,
        inscripcionEstado,
        acompanantes,
        inscripcionFecha
      )
    );

    alert(respuesta.mensaje);

    if (!respuesta.error) {
      // Si NO hay error
      //Resetear formulario
      frmModParticipante.reset();
      // Ocultar el formulario
      frmModParticipante.classList.add("d-none");
    }
  }
}

function validarModParticipante() {
  // Recuperar datos del formulario frmModificarParticipante
  let nombre = frmModParticipante.txtModNombreP.value.trim();
  let email = frmModParticipante.txtModEmail.value.trim();
  let acompanantes = parseInt(
    frmModParticipante.txtModAcompanantes.value.trim()
  );

  let valido = true;
  let errores = "";

  if (nombre.length == 0 || email.length == 0) {
    valido = false;
    errores += "El nombre y el email no pueden estar vacíos. \n";
  }

  if (acompanantes > 10) {
    valido = false;
    errores += "El número de acompañantes no puede ser mayor que 10. \n";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

async function procesarBuscarEvento() {
  if (validarBuscarEvento()) {
    ocultarFormularios();
      let idEvento = parseInt(frmBuscarEvento.txtIdEvento.value.trim());

      let respuesta = await oPlataforma.buscarEvento(idEvento);

      if (!respuesta.error) { // Si NO hay error
          let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

          // Escribimos resultado
          let tablaSalida = "<table class='table'>";
          tablaSalida += "<thead><tr><th>EVENTOID</th><th>NOMBRE</th><th>DESCRIPCIÓN</th><th>IMAGEN</th><th>FECHA</th><th>LOCALIZACIÓN</th><th>ORGANIZADOR</th><th>EDITAR/BORRAR</th></tr></thead>";
          tablaSalida += "<tbody><tr>";
          tablaSalida += "<td>" + respuesta.datos.evento_id + "</td>";
          tablaSalida += "<td>" + respuesta.datos.evento_nombre + "</td>";
          tablaSalida += "<td>" + respuesta.datos.evento_descripcion + "</td>";
          tablaSalida += "<td>" + respuesta.datos.evento_imagen + "</td>";
          tablaSalida += "<td>" + respuesta.datos.evento_fecha + "</td>";
          tablaSalida += "<td>" + respuesta.datos.evento_localizacion + "</td>";
          tablaSalida += "<td>" + respuesta.datos.evento_organizador + "</td>";
          tablaSalida += "<td><button class='btn btn-danger' id='btnBorrarEvento" + respuesta.datos.evento_id + "' data-eventoid='" + respuesta.datos.evento_id + "'><i class='bi bi-trash'></i></button>";
          tablaSalida += "<button class='btn btn-primary' id='btnModEvento" + respuesta.datos.evento_id + "' data-evento='" + JSON.stringify(respuesta.datos) + "'><i class='bi bi-pencil-square'></i></button></td>";
          tablaSalida += "</tr></tbody></table>";

          resultadoBusqueda.innerHTML = tablaSalida;
          // resultadoBusqueda.style.display = 'block';

          // Registrar evento para el botón borrar
          document.querySelector("#btnBorrarEvento" + respuesta.datos.evento_id).addEventListener("click", borrarEvento);
          document.querySelector("#btnModEvento" + respuesta.datos.evento_id).addEventListener("click", procesarBotonEditarEvento);
      } else { // Si hay error
          alert(respuesta.mensaje);
      }
      //Resetear formulario
      frmBuscarEvento.reset();
  }
}

function validarBuscarEvento() {
  let idEvento = parseInt(frmBuscarEvento.txtIdEvento.value.trim());
  let valido = true;
  let errores = "";

  if (isNaN(idEvento)) {
      valido = false;
      errores += "El identificador de participante debe ser numérico";
  }

  if (!valido) {
      // Hay errores
      alert(errores);
  }

  return valido;
}

async function procesarBuscarParticipante() {
  if (validarBuscarParticipante()) {
    ocultarFormularios();
      let idParticipante = parseInt(frmBuscarParticipante.txtIdParticipante.value.trim());

      let respuesta = await oPlataforma.buscarParticipante(idParticipante);

      if (!respuesta.error) { // Si NO hay error
          let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

          // Escribimos resultado
          let tablaSalida = "<table class='table'>";
          tablaSalida += "<thead><tr><th>IDPARTICIPANTE</th><th>NOMBRE</th><th>EMAIL</th><th>EVENTO</th><th>ESTADO INSCRIPCIÓN</th><th>Nº ACOMPAÑANTES</th><th>FECHA INSCRIPCIÓN</th><th>EDITAR/BORRAR</th></tr></thead>";
          tablaSalida += "<tbody><tr>";
          tablaSalida += "<td>" + respuesta.datos.participante_id + "</td>";
          tablaSalida += "<td>" + respuesta.datos.participante_nombre + "</td>";
          tablaSalida += "<td>" + respuesta.datos.participante_email + "</td>";
          tablaSalida += "<td>" + respuesta.datos.evento + "</td>";
          tablaSalida += "<td>" + respuesta.datos.inscripcion_estado + "</td>";
          tablaSalida += "<td>" + respuesta.datos.numero_acompanantes + "</td>";
          tablaSalida += "<td>" + respuesta.datos.inscripcion_fecha + "</td>";
          tablaSalida += "<td><button class='btn btn-danger' id='btnBorrarParticipante" + respuesta.datos.participante_id + "' data-idparticipante='" + respuesta.datos.participante_id + "'><i class='bi bi-trash'></i></button>";
          tablaSalida += "<button class='btn btn-primary' id='btnModParticipante" + respuesta.datos.participante_id + "' data-participante='" + JSON.stringify(respuesta.datos) + "'><i class='bi bi-pencil-square'></i></button></td>";
          tablaSalida += "</tr></tbody></table>";

          resultadoBusqueda.innerHTML = tablaSalida;
          // resultadoBusqueda.style.display = 'block';

          // Registrar evento para el botón borrar
          document.querySelector("#btnBorrarParticipante" + respuesta.datos.participante_id).addEventListener("click", borrarParticipante);
          document.querySelector("#btnModParticipante" + respuesta.datos.participante_id).addEventListener("click", procesarBotonEditarParticipante);
      } else { // Si hay error
          alert(respuesta.mensaje);
      }
      //Resetear formulario
      frmBuscarParticipante.reset();
  }
}

function validarBuscarParticipante() {
  let idParticipante = parseInt(frmBuscarParticipante.txtIdParticipante.value.trim());
  let valido = true;
  let errores = "";

  if (isNaN(idParticipante)) {
      valido = false;
      errores += "El identificador de participante debe ser numérico";
  }

  if (!valido) {
      // Hay errores
      alert(errores);
  }

  return valido;
}

async function borrarEvento(oEvento) {
  let boton = null;

  // Verificamos si han hecho clic sobre el botón o el icono
  if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "BUTTON") {
    if (oEvento.target.nodeName == "I") {
      // Pulsacion sobre el icono
      boton = oEvento.target.parentElement; // El padre es el boton
    } else {
      boton = oEvento.target;
    }

    // 1.Ocultar todos los formularios
    ocultarFormularios();
    let eventoid = boton.dataset.eventoid;

    let respuesta = await oPlataforma.borrarEvento(eventoid);

    alert(respuesta.mensaje);
  }
}

async function borrarParticipante(oEvento) {
  let boton = null;

  // Verificamos si han hecho clic sobre el botón o el icono
  if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "BUTTON") {
    if (oEvento.target.nodeName == "I") {
      // Pulsacion sobre el icono
      boton = oEvento.target.parentElement; // El padre es el boton
    } else {
      boton = oEvento.target;
    }

    // 1.Ocultar todos los formularios
    ocultarFormularios();
    let idParticipante = boton.dataset.idparticipante;

    let respuesta = await oPlataforma.borrarParticipante(idParticipante);

    alert(respuesta.mensaje);
  }
}
document.addEventListener("DOMContentLoaded", function () {
          // Obtener todos los botones "Darse de alta"
          const btnsDarseAlta = document.querySelectorAll(".btn-darse-alta");

          // Obtener el elemento toast
          const toastElement = document.getElementById("loginToast");
          const toast = new bootstrap.Toast(toastElement);

          // Agregar event listener a cada botón
          btnsDarseAlta.forEach(function (btn) {
            btn.addEventListener("click", function (e) {
              e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
              toast.show(); // Mostrar el toast
            });
          });
        });