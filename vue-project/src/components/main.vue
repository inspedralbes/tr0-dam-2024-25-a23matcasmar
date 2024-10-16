<script>
import { ref, onMounted } from 'vue';
import { getPreguntes } from '@/communicationmanager';
import { postPreguntes } from '@/communicationmanager';

    async function fetchPreguntas() {
        try{
        const preguntas = await getPreguntes();
        } catch (error) {
        console.error('Error al obtenir les preguntes:', error);
        }
    }
    onMounted(() => {
        fetchPreguntas();
    });
</script>

<template>
    <div><h1>Cuestionari de conduir!!</h1>
    <ul>
        <li v-for="pregunta in preguntas" :key="pregunta.id">
        <strong>{{ pregunta.pregunta }}</strong>
        <p>{{ pregunta.resposta_correcta }}</p>
        <p>{{ pregunta.resposta_incorrecta }}</p>
        <img src="pregunta.imatge" alt="Imatge de la pregunte"/>
        </li>
    </ul>
    </div>
</template>



<style scoped>

</style>
