// 1. Importar Express

const express= require('express');

// 2. Crear la aplicación
const app = express();

// 3. Definir el puerto
const port = 3000;

// 4. Configurar Express para entender JSON
app.use(express.json());

// 5. Crear nuestra primera ruta
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '¡Hola! Mi primer servidor funciona 🎉' 
  });
});

app.get('/peliculas', async (req, res) => {
  try {
    const {leerPeliculasJSON}= require("./utils/movieUtil.js");
    const peliculas = await leerPeliculasJSON(); // Llamada a la función para leer el JSON
    if(req.query.rating_top){
      const rating = parseFloat(req.query.rating_top);
      if(isNaN(rating)){
        return res.status(400).json({ error: 'El parámetro rating debe ser un número' });
      }
      // Filtrar las películas por rating
      const peliculasFiltradas = peliculas.filter(pelicula => pelicula.imdb_rating >= rating);
      return res.status(200).json(peliculasFiltradas); // Enviar las películas filtradas como respuesta
    }
    if(req.query.rating_low){
      const rating = parseFloat(req.query.rating_low);
      if(isNaN(rating)){
        return res.status(400).json({ error: 'El parámetro rating debe ser un número' });
      }
      // Filtrar las películas por rating
      const peliculasFiltradas = peliculas.filter(pelicula => pelicula.imdb_rating <= rating);
      return res.status(200).json(peliculasFiltradas); // Enviar las películas filtradas como respuesta
    }

    return res.status(200).json(peliculas); // Enviar las películas como respuesta  
    }
  catch (error) {
    console.error('❌ Error al obtener las películas:', error.message);
    res.status(500).json({ error: 'Error al obtener las películas' });
  } 
});




// 6. Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor funcionando en http://localhost:${port}`);
});





