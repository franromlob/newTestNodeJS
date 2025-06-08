// VAMOS A CREAR UN PEQUEÑO SERVIDOR, es mecánico, siempre se hace igual

// Coge el módulo 'http', que es para crear un servidor
const http = require("http");

const PORT = 3000;

// req: son los detalles de la solicitud, lo que nos va a enviar
// res: la respuesta al cliente
const server = http.createServer((req, res) => {
  // Le enviaremos un contenido tipo: HTML
  res.setHeader("Content-Type", "text/html");
  res.end("<h1> Hola, mundo </h1>");
});

// Levantamos el Servidor, PORT = 3000
server.listen(PORT, () => {
  console.log(`Server running at http:localhost:${PORT}`);
});
