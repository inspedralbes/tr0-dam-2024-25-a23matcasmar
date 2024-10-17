export async function getPreguntes(){
    let preguntas = await fetch('http://a23matcasmar.dam.inspedralbes.cat:21000/preguntes')
    preguntas= await preguntas.json();
    return preguntas
}

export async function postPreguntes(pregunta, resposta_correcta, respostes_incorrectes, imatge){
    let resposte = await fetch('http://a23matcasmar.dam.inspedralbes.cat:21000/publicarP', {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            pregunta: pregunta,
            resposta_correcta: resposta_correcta,
            respostes_incorrectes: respostes_incorrectes,
            imatge: imatge
        })
    })
    resposte = await resposte.json();
    return resposte
}
export async function eliminarPreguntes(id) {
    try {
        let eliminar = await fetch('http://a23matcasmar.dam.inspedralbes.cat:21000/eliminarP', {
        method : 'DELETE',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({id})
        })
        const preguntesActualizarts = await eliminar.json();
        console.log('Pregunte aliminada: ', preguntesActualizarts);
        return preguntesActualizarts
    } catch (error) {
        console.error('Error al eliminar pregunta: ', error);
    }
}
export async function actualizarPregunta(id, nuevaPregunta) {
    try {
        let modificacion = await fetch(`http://a23matcasmar.dam.inspedralbes.cat:21000/actualizarP/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaPregunta),
        });
        const preguntesActualizades = await modificacion.json();
        console.log('Pregunta actualizada:', preguntesActualizades);
        return preguntesActualizades;
    } catch (error) {
        console.error('Hubo un error:', error);
    }
}