const express = require('express');
const dades = require('./Proyecte0.json');
const app = express();
const cors = require('cors');
const fs = require('fs');
const PORT = 21000;


app.use(express.json());
app.use(cors());

app.get('/preguntes', (req, res) => {
    res.send (json.preguntes);
});

let json;

fs.readFile('./Proyecte0.json', 'utf8', (err,data) => {
    if (err) {
        console.error('Error leyendo el archivo JSON');
        return;
    }
    json = JSON.parse(data);
});

app.post('/publicarP', (req, res) => {
    const {pregunta, resposta_correcta, respostes_incorrectes, imatge} = req.body;
    const novaP = {
        id: json.preguntes.length,
        pregunta: pregunta,
        resposta_correcta: resposta_correcta,
        respostes_incorrectes: respostes_incorrectes,
        imatge: imatge
    };
    json.preguntes.push(novaP);
    fs.writeFile('./Proyecte0.json', JSON.stringify(json, null, 2), (error) => {
        if(error) {
            console.err('Ha ocurrido un error:', error);
        }
        else {
            console.log('Se ha añadido con exito');
        }
    });
    res.send(json.preguntes);
});
app.delete('/eliminarP', (req, res) => {
    const id = parseInt(req.body.id);
    json.preguntes = json.preguntes.filter((pregunta) => pregunta.id !== (id - 1));
    json.preguntes.forEach((pregunta, index) => {
        pregunta.id = index;
    });
    fs.writeFile('./Proyecte0.json', JSON.stringify(json, null, 2), (error) => {
        if(error) {
            console.error('Ha ocurrido un error:', error);
        }
        else {
            console.log('Se ha eliminado con exito');
            res.send(json.preguntes);
        }
    });
});
app.put('/actualizarP/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idAnterior = id - 1;
    const { pregunta, resposta_correcta, respostes_incorrectes, imatge } = req.body;
    const preguntaActualizada = {
        id : idAnterior,
        pregunta,
        resposta_correcta,
        respostes_incorrectes,
        imatge
    };
    json.preguntes[idAnterior] = preguntaActualizada;

    fs.writeFile('./Proyecte0.json', JSON.stringify(json, null, 2), (error) => {
        if(error) {
            console.error('Ha ocurrido un error:', error);
        }
        else {
            console.log('Se ha eliminado con exito');
            res.send(json.preguntes);
        }
    });
});
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
