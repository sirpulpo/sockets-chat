class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala }

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(pers => {
            return pers.id === id
        })[0];

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let persala = this.personas.filter(pers => {
            return pers.sala === sala
        });
        return persala;
    }

    borrarPersona(id) {
        let personaDltd = this.getPersona(id);

        this.personas = this.personas.filter(pers => {
            return pers.id != id
        });

        return personaDltd;
    }
}



module.exports = {
    Usuarios
}