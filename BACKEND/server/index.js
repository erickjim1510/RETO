import express from 'express';
import { PORT } from './config.js';
import clasificacionRoutes from './routes/clasificacion.routes.js';

import cors from 'cors'; // Importar CORS

const app = express();

// poder usar el postman y ver lo delo body
app.use(express.json());

app.use(cors());
app.use(clasificacionRoutes);



app.listen(PORT); //abre servidor en puerto 4000
console.log(`Server is listening  on port ${PORT}`);
