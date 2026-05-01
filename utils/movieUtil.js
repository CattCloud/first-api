const fs = require('fs/promises');
const path = require('path');

async function leerPeliculasJSON() {
  try {
    const contenido = await fs.readFile("./data/movies.json", 'utf8');         // ← método de lectura
    const peliculas = JSON.parse(contenido);         
    console.log(peliculas);              // ← convierte de string a objeto JS
    return peliculas;
  } catch (error) {
    console.error('❌ Error al leer el archivo JSON:', error.message);
    throw new Error("Error al leer el archivo JSON");
  }
}

module.exports = {leerPeliculasJSON}