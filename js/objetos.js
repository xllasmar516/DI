class Evento {
    #eventoid;
    #nombre;
    #descripcion;
    #imagen;
    #fecha;
    #localizacion;
    #organizador;

    constructor(eventoid, nombre, descripcion, imagen, fecha, localizacion, organizador) {
        this.#eventoid = eventoid;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#imagen = imagen;
        this.#fecha = fecha;
        this.#localizacion = localizacion;
        this.#organizador = organizador;
    }

    get eventoid() {
        return this.#eventoid;
    }
    get nombre() {
        return this.#nombre;
    }
    get descripcion() {
        return this.#descripcion;
    }   
    get imagen() {
        return this.#imagen;
    }
    get fecha() {
        return this.#fecha;
    }
    get localizacion() {
        return this.#localizacion;
    }
    get organizador() {
        return this.#organizador;
    }

    set eventoid(eventoid) {
        this.#eventoid = eventoid;
    }   
    set nombre(nombre) {
        this.#nombre = nombre;
    }
    set descripcion(descripcion) {
        this.#descripcion = descripcion;
    }
    set imagen(imagen) {
        this.#imagen = imagen;
    }   
    set fecha(fecha) {
        this.#fecha = fecha;
    }
    set localizacion(localizacion) {
        this.#localizacion = localizacion;
    }
    set organizador(organizador) {
        this.#organizador = organizador;
    }
    
    toJSON() {
        let oEvento = {
            eventoid: this.#eventoid,
            nombre: this.#nombre,
            descripcion: this.#descripcion,
            imagen: this.#imagen,
            fecha: this.#fecha,
            localizacion: this.#localizacion,
            organizador: this.#organizador
        }
        return oEvento;
    }
}

class Participante {
    #idparticipante;
    #nombre;
    #email;
    #eventoid;
    #inscripcionEstado;
    #acompanantes;
    #inscripcionFecha;

    constructor(idparticipante, nombre, email, eventoid, inscripcionEstado, acompanantes, inscripcionFecha) {
        this.#idparticipante = idparticipante;
        this.#nombre = nombre;
        this.#email = email;
        this.#eventoid = eventoid;
        this.#inscripcionEstado = inscripcionEstado;
        this.#acompanantes = acompanantes;
        this.#inscripcionFecha = inscripcionFecha;
    }

    get idparticipante() {
        return this.#idparticipante;
    }
    get nombre() {
        return this.#nombre;
    }
    get email() {
        return this.#email;
    } 
    get eventoid() {
        return this.#eventoid;
    }
    get inscripcionEstado() {
        return this.#inscripcionEstado;
    }
    get acompanantes() {
        return this.#acompanantes;
    }
    get inscripcionFecha() {
        return this.#inscripcionFecha;
    }

    set idparticipante(idparticipante) {
        this.#idparticipante = idparticipante;
    }
    set nombre(nombre) {
        this.#nombre = nombre;
    }
    set email(email) {
        this.#email = email;
    }
    set eventoid(eventoid) {
        this.#eventoid = eventoid;
    }
    set inscripcionEstado(inscripcionEstado) {
        this.#inscripcionEstado = inscripcionEstado;
    }
    set acompanantes(acompanantes) {
        this.#acompanantes = acompanantes;
    }
    set inscripcionFecha(inscripcionFecha) {
        this.#inscripcionFecha = inscripcionFecha;
    }

    toJSON() {
        let oParticipante = {
            idparticipante: this.#idparticipante,
            nombre: this.#nombre,
            email: this.#email,
            eventoid: this.#eventoid,
            inscripcionEstado: this.#inscripcionEstado,
            acompanantes: this.#acompanantes,
            inscripcionFecha: this.#inscripcionFecha
        }
        return oParticipante;
    }

}

class Plataforma {
    //INSERTAR
    async altaEvento(oEvento) {
        let datos = new FormData();
        
        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("evento",JSON.stringify(oEvento));
        
        let respuesta = await peticionPOST("alta_evento.php", datos);

        return respuesta;
    }

    async altaParticipante(oParticipante) {
        let datos = new FormData();

        datos.append("participante",JSON.stringify(oParticipante));
       
        let respuesta = await peticionPOST("alta_participante.php", datos);

        return respuesta;
    }


    //MODIFICAR
    async modificarEvento(oEvento) {
        let datos = new FormData();

        datos.append("evento",JSON.stringify(oEvento));
       
        let respuesta = await peticionPOST("modificar_evento.php", datos);

        return respuesta;
    }

    async modificarParticipante(oParticipante) {
        let datos = new FormData();

        datos.append("participante",JSON.stringify(oParticipante));
       
        let respuesta = await peticionPOST("modificar_participante.php", datos);

        return respuesta;
    }


    //BUSCAR
    async buscarEvento(eventoid) {
        let datos = new FormData();

        datos.append("eventoid", eventoid);

        let respuesta = await peticionGET("buscar_evento.php", datos);

        return respuesta;
    }

    async buscarParticipante(idParticipante) {
        let datos = new FormData();

        datos.append("idparticipante", idParticipante);

        let respuesta = await peticionGET("buscar_participante.php", datos);

        return respuesta;
    }


    //BORRAR
    async borrarEvento(eventoid) {
        let datos = new FormData();

        datos.append("eventoid", eventoid);

        let respuesta = await peticionPOST("borrar_evento.php", datos);

        return respuesta;
    }

    async borrarParticipante(idParticipante) {
        let datos = new FormData();

        datos.append("idparticipante", idParticipante);

        let respuesta = await peticionPOST("borrar_participante.php", datos);

        return respuesta;
    }


    //LISTAR
    async listadoEventos() {
        let respuesta = await peticionGET("get_eventos.php", new FormData());

        return respuesta;
    }

    async listadoParticipantes() {
        let respuesta = await peticionGET("get_participantes.php", new FormData());
        
        return respuesta;
    }


    //Listado Eventos Condicionado
    async listadoPorFecha(fecha){
        let datos = new FormData();

        datos.append("fecha",fecha);

        let respuesta = await peticionGET("get_eventos_por_fecha.php", datos);

        return respuesta;
    }

    //Listado Participantes Condicionado
    async listadoPorEvento(eventoid){
        let datos = new FormData();

        datos.append("eventoid",eventoid);

        let respuesta = await peticionGET("get_participantes_por_evento.php", datos);

        return respuesta;
    }

    
    //Para el select de participantes
    async getEventos() {
        let datos = new FormData();

        let respuesta = await peticionGET("get_eventos.php", datos);

        return respuesta;
    }
}