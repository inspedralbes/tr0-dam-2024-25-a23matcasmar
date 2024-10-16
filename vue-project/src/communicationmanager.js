export async function getPreguntes(){
    let preguntas = await fetch('http://localhost:4000/preguntes')
    preguntas= await preguntas.json();
    return preguntas
}

export async function postPreguntes(pregunta, resposta_correcta, respostes_incorrectes, imatge){
    let resposte = await fetch('http://localhost:4000/publicarP', {
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
export async function eliminarPreguntes(params) {
    
}