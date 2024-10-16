const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const PORT = 4000;
const dades = require('./../Proyecte0.json');

app.use(express.json());
app.use(cors());

app.get('/preguntes', (req, res) => {
    res.send(dades.preguntes);
});

let json;

fs.readFile('./../Proyecte0.json', 'utf8', (err,data) => {
    if (err) {
        console.error('Error leyendo el archivo JSON');
        return;
    }
    json = JSON.parse(data);
});

app.post('/publicarP', (req, res) => {
    const {pregunta, resposta_correcta, respostes_incorrectes, imatge} = req.body;
    const novaP = {
        pregunta: pregunta,
        resposta_correcta: resposta_correcta,
        respostes_incorrectes: respostes_incorrectes,
        imatge: imatge
    };
    json.preguntes.push(novaP);
    fs.writeFile('./../Proyecte0.json', JSON.stringify(json, null, 2), (err) => {
        if(err) {
            console.err('Ha ocurrido un error:', err);
        }
        else {
            console.log('Se ha añadido con exito');
        }
    });
});
app.delete('/eliminarP', (req, res) => {
    const id = parseInt(req.param.index);
    dades.preguntes.splice(id, 1);
})

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
