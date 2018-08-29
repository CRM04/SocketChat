class Usuarios {

    constructor(){
        this.personas = [];
    }

    agregarPersona(id , nombre, sala){
        this.personas.push( { id, nombre, sala} );
    }

    getPersona( id ){
        let persona = this.personas.filter( perso => perso.id == id)[0];
        return persona;
    }

    getPersonas(){
        return this.personas;
    }

    getPersonasBySala( sala ){
        let personasEnSala = this.personas.filter( person => {
            return person.sala == sala
        })
        return personasEnSala;
    }

    borrarPersona(id){
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter( perso => perso.id != id);
        return personaBorrada;
    }

}

module.exports =  { Usuarios };