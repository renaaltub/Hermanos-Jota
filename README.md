# E-commerce Mueblería Hermanos Jota  
**Consigna Final Sprints 5 y 6**

---

## Integrantes
- Altube, Renata (@renaaltub)  
- Andreassi, Facundo V. (@facu-v01)  
- Cazzulino, Marcos (@MarcosCazzulino)  
- Marsilli, Juan I. (@juanmarsilli147)

---

## Descripción General
Proyecto de e-commerce **Mueblería Hermanos Jota**, desarrollado como parte de los **Sprints 5 y 6**.  
Se trabajó sobre la entraga anterior, realizando una conexión con una base de datos de MongoDB para los productos.  
El sistema permite visualizar productos, ver sus detalles, simular un carrito de compras, realizar consultas desde un formulario de contacto, crear productos y eliminarlos.

---

## Producción
- **Frontend:** https://hermanos-jota-theta.vercel.app/
- **Backend:** http://localhost:4000/

## Desarrollo (instalación y ejecución local)

### Clonado del repositorio
- git clone https://github.com/juanmarsilli147/Hermanos-Jota.git
- cd Hermanos-Jota

### Declaración de variables de entorno
Agregar en la carpeta server (backend) un archivo .env con las siguientes líneas, reemplazando con los datos adecuados en cada caso:
- MONGODB_URI="mongodb+srv://<usuario>:<contraseña>@hermanos-jota.gvgweov.mongodb.net/hermanos-jota?retryWrites=true&w=majority&appName=Hermanos-Jota"
- CLOUDINARY_CLOUD_NAME=<CLOUDINARY_CLOUD_NAME>
- CLOUDINARY_API_KEY=<CLOUDINARY_API_KEY>
- CLOUDINARY_API_SECRET=<CLOUDINARY_API_SECRET>

### Incialización del backend
**Ejecutar los siguientes comandos en orden**
- cd server 
- npm install
- npm run dev
- Servidor corriendo en el http://localhost:4000

### Incialización del frontend
**Ejecutar los siguientes comandos en orden**
- cd client 
- npm install
- npm start
- Servidor corriendo en el http://localhost:3000

---

## Descripción de la Arquitectura (Cliente - Servidor)

### Frontend (React)
- Desarrollado como una **Single Page Application** con **React**.
- Usa `useState` para manejar el estado y **props** para la comunicación entre componentes.
- Implementa **React Router DOM** para alternar entre las vistas:
  - Pagina Inicio
  - Catálogo de productos  
  - Detalle de producto  
  - Formulario de contacto
  - Panel de administración
  - Formulario de agregado de producto
- Implementa un botón "Eliminar producto" en el detalle de cada uno (proximamente visible únicamente para los administradores).
- Simulación de carrito con contador global manejado en `App.js`.  
- Estilos con diseño **responsive (Mobile First)** usando Flexbox y Grid.

### Backend (Node.js + Express + MongoDB)
- Implementa un **servidor web** con Express.  
- Fuente de datos externa: base de datos alojada en MongoDB Atlas.
- Recepción de imágenes del producto nuevo mediante Cloudinary, Multer y Streamifier.
- Endpoints definidos:
  - `GET /api/productos` : Devuelve todos los productos.
  - `POST /api/productos` : Crea un producto nuevo.
  - `GET /api/productos/:id` : Devuelve el detalle de un producto específico.
  - `PUT /api/productos/:id` : Actualiza un producto específico.
  - `DELETE /api/productos/:id` : Elimina un producto específico.
- Incluye:
  - **Middleware de logging** para registrar método y URL de cada petición.  
  - **Manejo de rutas modular** con `express.Router`.  
  - **Manejo de errores centralizado** para respuestas 404 y errores de servidor.
  - **Conexión con base de datos en MongoDB Atlas**.

---

## Decisiones Técnicas
- Separación clara entre cliente y servidor para facilitar mantenimiento.  
- Comunicación a través de **API** entre el cliente y el servidor.  
- Enfoque **modular y escalable** en Express (rutas, controladores, middlewares).  
- **SPA en React** para mejorar la experiencia del usuario.
- Productos e información relacionada almacenada en una base de datos de MongoDB Atlas.
