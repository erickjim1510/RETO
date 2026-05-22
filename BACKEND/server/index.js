import express from 'express';
import { PORT } from './config.js';
import clasificacionRoutes from './routes/clasificacion.routes.js';
import usuarioRoutes from './routes/usuarios.routes.js';
import generosRoutes from './routes/generos.routes.js';
import peliculasRoutes from './routes/peliculas.routes.js'
import salasRoutes from './routes/salas.routes.js'
import tipoSalaRoutes from './routes/tipoSala.routes.js'
import proyeccionesRoutes from './routes/proyeccion.routes.js'
import cineRoutes from "./routes/cine.routes.js"
import boletoRoutes from "./routes/boleto.routes.js"
import pagoRoutes from "./routes/pago.routes.js"
import cors from 'cors'; // Importar CORS

const app = express();

// poder usar el postman y ver lo delo body
app.use(express.json());

app.use(cors());
app.use(clasificacionRoutes);
app.use(usuarioRoutes);
app.use(generosRoutes);
app.use(peliculasRoutes);
app.use(salasRoutes)
app.use(tipoSalaRoutes)
app.use(proyeccionesRoutes)
app.use(cineRoutes)
app.use(boletoRoutes)
app.use(pagoRoutes)


app.listen(PORT); //abre servidor en puerto 4000
console.log(`Server is listening  on port ${PORT}`);
