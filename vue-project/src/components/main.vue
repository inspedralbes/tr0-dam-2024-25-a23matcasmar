<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { getPreguntes, postPreguntes, eliminarPreguntes, actualizarPregunta } from '@/communicationmanager';
const preguntes = reactive({data:{ }})
const aparecerAñadir = ref(false)
const aparecerEliminar = ref(false)
const aparecerEditar = ref(false)
const nueva_pregunta = reactive({data:{
        pregunta:'',
        respostaCorrecta:'',
        respostaIncorrecta1:'',
        respostaIncorrecta2:'',
        respostaIncorrecta3:'',
        imatge:''
}}) 
const idEliminar = ref('')
const idEditar = ref('')
onBeforeMount(() => {
        fetchGetPreguntas()
});
async function fetchGetPreguntas() {
    try {
        preguntes.data = await getPreguntes();
    }
    catch (error) {
        console.log('Error al obtener preguntes', error);
    }
};
async function fetchPostPreguntas() {
    const resposta_incorrectas = [
        nueva_pregunta.respostaIncorrecta1,
        nueva_pregunta.respostaIncorrecta2,
        nueva_pregunta.respostaIncorrecta3
    ];
    if (
        nueva_pregunta.pregunta != null && 
        nueva_pregunta.respostaCorrecta != null && 
        nueva_pregunta.respostaIncorrecta1 != null &&
        nueva_pregunta.respostaIncorrecta2 != null &&
        nueva_pregunta.respostaIncorrecta3 != null &&
        nueva_pregunta.imatge != null
        ) {
    try {
        const novapregunta = await postPreguntes(
            nueva_pregunta.pregunta,
            nueva_pregunta.respostaCorrecta,
            resposta_incorrectas,
            nueva_pregunta.imatge
        );
        nueva_pregunta.pregunta = '';
        nueva_pregunta.respostaCorrecta = '';
        nueva_pregunta.respostaIncorrecta1 = '';
        nueva_pregunta.respostaIncorrecta2 = '';
        nueva_pregunta.respostaIncorrecta3 = '';
        nueva_pregunta.imatge = '';
        console.log('Respuesta del servidor: ', novapregunta);
        await fetchGetPreguntas();
    }
    catch (error) {
        console.error('Hubo un problema al añadir la pregunta: ', error);
    }
    aparecerAñadir.value = false
}};
async function fetchDeletePreguntas() {
    try {
        const preguntaEliminada = await eliminarPreguntes(idEliminar.value);
        preguntes.data = preguntaEliminada;
    console.log('Respuesta eliminada: ', preguntaEliminada);
    await fetchGetPreguntas();
    }
    catch (error) {
        console.error('Hubo un problema al eliminar la pregunta: ', error);
    }
};
async function fetchUpdatePreguntas(id) {
    const resposta_incorrectas = [
        nueva_pregunta.respostaIncorrecta1,
        nueva_pregunta.respostaIncorrecta2,
        nueva_pregunta.respostaIncorrecta3
    ];

    const nuevaPregunta = {
        pregunta: nueva_pregunta.pregunta,
        resposta_correcta: nueva_pregunta.respostaCorrecta,
        respostes_incorrectes: resposta_incorrectas,
        imatge: nueva_pregunta.imatge
    };
    {
        try {
            const respuesta = await actualizarPregunta(id, nuevaPregunta);
            console.log('Pregunta actualizada: ', respuesta);
            await fetchGetPreguntas();
        } catch (error) {
            console.error('Hubo un problema al actualizar la pregunta: ', error);
        }
    }
};
function aparecer_Añadir() {
    aparecerAñadir.value = !aparecerAñadir.value
};
function submit_añadir() {
    fetchPostPreguntas();
    aparecerAñadir.value = false
};
function aparecer_Eliminar() {
    aparecerEliminar.value = !aparecerEliminar.value
};
function submit_eliminar() {
    fetchDeletePreguntas();
    aparecerEliminar.value = false
};
function aparecer_editar() {
    aparecerEditar.value = !aparecerEditar.value
};
function submit_editar() {
    fetchUpdatePreguntas(idEditar.value);
    aparecerEditar.value = false
};


</script>

<template>
    <div class="main-container">
        <div class="header">
            <button class="añadirP" @click="aparecer_Añadir">Añadir Pregunta</button>
            <button class="añadirP" @click="aparecer_Eliminar">Eliminar Pregunta</button>
            <button class="añadirP" @click="aparecer_editar">Editar Pregunta</button>
            <p class="titulo">Preguntas de conduir</p>
            <div></div>
        </div>
        <div v-if="aparecerAñadir">
            <table>
                <tbody>
                <tr>
                    <td><label for="pregunta">Pregunta:</label></td>
                    <td><input v-model="nueva_pregunta.pregunta" type="text" id="pregunta" name="pregunta"></td>
                </tr>
                <tr>
                    <td><label for="imagen">Imagen:</label></td>
                    <td><input v-model="nueva_pregunta.imatge" type="text" id="imagen" name="imagen"></td>
                </tr>
                <tr>
                    <td><label for="respuestaI">Respuestas incorrectas:</label></td>
                    <td><input v-model="nueva_pregunta.respostaIncorrecta1" type="text" id="respuestaI" name="respuestas incorrectas"></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input v-model="nueva_pregunta.respostaIncorrecta2" type="text" id="respuestaI" name="respuestas incorrectas"></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input v-model="nueva_pregunta.respostaIncorrecta3" type="text" id="respuestaI" name="respuestas incorrectas"></td>
                </tr>
                <tr>
                    <td><label for="respuestaC">Respuesta correcta:</label></td>
                    <td><input v-model="nueva_pregunta.respostaCorrecta" type="text" id="respuestaC" name="respuesta correcta"></td>
                </tr>
                </tbody>
            </table>
            <input @click="submit_añadir" type="submit" id="añadirP" value="Enviar">
        </div>
        <div v-if="aparecerEliminar">
                <table>
                    <tbody>
                        <tr>
                            <td><label for="EliminarP">Número de pregunta a eliminar: </label></td>
                            <td><input v-model="idEliminar" id="EliminarP"></td>
                        </tr>
                    </tbody>
                </table>
                <input @click="submit_eliminar" type="submit" id="eliminarP" value="Enviar">
        </div>
        <div v-if="aparecerEditar">
            <table>
                <tbody>
                <tr>
                    <td><label for="id">Id:</label></td>
                    <td><input v-model="idEditar" type="text" id="id" name="id"></td>
                </tr>
                <tr>
                    <td><label for="pregunta">Pregunta:</label></td>
                    <td><input v-model="nueva_pregunta.pregunta" type="text" id="pregunta" name="pregunta"></td>
                </tr>
                <tr>
                    <td><label for="imagen">Imagen:</label></td>
                    <td><input v-model="nueva_pregunta.imatge" type="text" id="imagen" name="imagen"></td>
                </tr>
                <tr>
                    <td><label for="respuestaI">Respuestas incorrectas:</label></td>
                    <td><input v-model="nueva_pregunta.respostaIncorrecta1" type="text" id="respuestaI" name="respuestas incorrectas"></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input v-model="nueva_pregunta.respostaIncorrecta2" type="text" id="respuestaI" name="respuestas incorrectas"></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input v-model="nueva_pregunta.respostaIncorrecta3" type="text" id="respuestaI" name="respuestas incorrectas"></td>
                </tr>
                <tr>
                    <td><label for="respuestaC">Respuesta correcta:</label></td>
                    <td><input v-model="nueva_pregunta.respostaCorrecta" type="text" id="respuestaC" name="respuesta correcta"></td>
                </tr>
                </tbody>
            </table>
            <input @click="submit_editar" type="submit" id="añadirP" value="Enviar">
        </div>
        <ul>
            
            <ol v-for="pregunta in preguntes.data" :key="pregunta.id">
            <p class="enunciado">{{ pregunta.pregunta }}</p>
            <br>
            <img :src="pregunta.imatge" alt="imagen de pregunta">
            <br>
            <p class="respuestaC">{{ pregunta.resposta_correcta }}</p>
            <p class="respuestas" v-for="incorrecta in pregunta.respostes_incorrectes">{{ incorrecta }}</p>
            </ol>
        </ul>
    </div>
</template>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    text-align: center;
}
.titulo {
    font-size: 40px;
}
.enunciado {
    font-size: 30px;
}
.respuestas {
    font-size: 20px;
    text-align: left;
    background-color: rgba(0, 0, 0, 0.247);
    margin: 10px;
    padding: 20px;
    border-radius: 50px;
}
.respuestaC {
    font-size: 20px;
    text-align: left;
    background-color: rgba(173, 171, 28, 0.247);
    margin: 10px;
    padding: 20px;
    border-radius: 50px;
}
img {
    width: 400px;
}
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: #ffdbab;
    padding: 20px;
}
.añadirP {
    background: linear-gradient(rgba(163, 92, 230, 0.623), rgba(44, 185, 155, 0.425));
    border-radius: 60px;
    border: none;
}
.añadirP:hover {
    background: linear-gradient(rgba(44, 185, 155, 0.425), rgba(163, 92, 230, 0.623));
}


</style>