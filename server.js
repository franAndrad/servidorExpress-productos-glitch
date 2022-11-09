const express = require('express');
const app = express()
const PORT = process.env.PORT || 8080
const Container = require("./clase")
const productos = new Container("./productos.json")

// Funcion random
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

// Configuramos el puerto
const server = app.listen(PORT, () => {
    console.log(`Express server listening to port ${PORT}`)
})

// Escuchamos un evento en caso de error
server.on('error', error => {
    console.log(`server error ${error}`)
})

app.get('/productos', async (req, res) => {
    res.send(await productos.getAll())
})
app.get('/productoRandom', async (req, res) => {
    let arregloProductos = await productos.getAll()
    res.send(await productos.getById(random(1,arregloProductos.length)))
})
