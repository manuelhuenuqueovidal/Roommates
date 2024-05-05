//Importaciones.
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//Constantes de dependencias.
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//App para levantar servidor en puerto 3000.
app.listen(3000 , console.log("Servidor arriba. 👍"))

//Ruta para recibir formato json.
app.use(express.json());

//Ruta por defecto para mostrar el HTML.
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//Ruta insertar usuario 2.
app.post("/roommate", async (req, res) => {
    try {
      const response = await fetch('https://randomuser.me/api');
      const { results } = await response.json();
      const { name } = results[0];
      const apellido = name.last;
      const roommatesJSON = JSON.parse(fs.readFileSync("roommate.json", "utf8"));
      
      // Chequea que exista la propiedad 'roommates' en el objeto JSON
      if (!roommatesJSON.roommates) {
        roommatesJSON.roommates = [];
      }
        const nuevoRoommate = { 
        id: uuidv4().slice(0, 6), 
        nombre: `${name.first} ${apellido}`,
        debe: Math.floor(Math.random() * 50 + 1) * 10000,
        recibe: Math.floor(Math.random() * 50 + 1) * 10000
      };
      roommatesJSON.roommates.push(nuevoRoommate);
      fs.writeFileSync("roommate.json", JSON.stringify(roommatesJSON, null, 2));
      res.send("Roommate agregado con éxito");
    } catch (error) {
      console.error("Error al agregar roommate:", error);
      res.status(500).send("Error al agregar roommate");
    }
  });

//Ruta obtener todos los roommates.
app.get("/roommates", (req, res) => {
    try {        
        const data = fs.readFileSync('roommate.json', 'utf8');
        const roommates = JSON.parse(data);
        res.send(roommates);
    } catch (error) {
        console.error("No se logra obtener roommates.")
    }

});

//Ruta obtener todos los gastos.
app.get("/gastos", (req, res) => {
    try {        
        const data = fs.readFileSync('gastos.json', 'utf8');
        const gastos = JSON.parse(data);
        res.send(gastos);
    } catch (error) {
        console.error("No se pueden obtener los gastos.")
    }

});

// Ruta insertar nuevo gasto.
app.post("/gasto", (req, res) => {
  try {
        const { roommate, descripcion, monto } = req.body;  
    console.log("Roommate:", roommate);
    console.log("Descripción:", descripcion);
    console.log("Monto:", monto);
    const gasto = { id: uuidv4().slice(30), roommate, descripcion, monto};
    const gastosJSON = JSON.parse(fs.readFileSync("gastos.json", "utf8"));
    gastosJSON.gastos.push(gasto);
    fs.writeFileSync("gastos.json", JSON.stringify(gastosJSON, null, 2));
    res.send("Gasto agregado con éxito");
  } catch (error) {
    console.error("Error al insertar un nuevo gasto.", error)
  }
});

// Ruta para modificar un gasto.
app.put("/gasto/:id", (req, res) => {
  const { id } = req.params; 
  const { descripcion, monto } = req.body;
  try {
      const gastosJSON = JSON.parse(fs.readFileSync("gastos.json", "utf8"));
      const gastoIndex = gastosJSON.gastos.findIndex(g => g.id === id);
      if (gastoIndex !== -1) {
          gastosJSON.gastos[gastoIndex] = { ...gastosJSON.gastos[gastoIndex], descripcion, monto };
          fs.writeFileSync("gastos.json", JSON.stringify(gastosJSON, null, 2));
          res.send("Gasto modificado con éxito");
      } else {
          res.status(404).send("No se encontró el gasto con el ID proporcionado");
      }
  } catch (error) {
      console.error("Error al modificar el gasto:", error);      
  }
});

// Ruta para eliminar un gasto específico.
app.delete("/gasto", (req, res) => {
  try {
        const { id } = req.query;
    const gastosJSON = JSON.parse(fs.readFileSync("gastos.json", "utf8"));
    gastosJSON.gastos = gastosJSON.gastos.filter((g) => g.id !== id);
    fs.writeFileSync("gastos.json", JSON.stringify(gastosJSON, null, 2));
    res.send("Gasto eliminado con éxito");
  } catch (error) {
    console.error("Hubo un problema al eliminar un gasto", error)
  }

});
