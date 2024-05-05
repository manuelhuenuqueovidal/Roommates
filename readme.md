# Roommates 

Este es un proyecto de una aplicación web para administrar roommates y gastos compartidos. Permite agregar roommates, registrar gastos y editarlos.

## Tecnologías utilizadas

- **Node.js**: Plataforma de ejecución de código JavaScript en el servidor.
- **Express.js**: Marco de aplicación web para Node.js.
- **UUID**: Para generar identificadores únicos.
- **fs (File System)**: Módulo de Node.js para interactuar con el sistema de archivos.
- **fetch**: Para realizar solicitudes HTTP desde el servidor.
- **HTML, CSS, Bootstrap y JavaScript**: Para la interfaz de usuario y la interactividad.

## Instalación y uso

1. Instala las dependencias con `npm install`.
2. Abre tu navegador y visita `http://localhost:3000`.

## Funcionalidades principales

- **Agregar Roommate**: Al hacer clic en el botón "Agregar roommate", se genera un nuevo roommate aleatorio utilizando la API de RandomUser.
- **Registrar Gasto**: Permite registrar un nuevo gasto asociado a un roommate seleccionado, con una descripción y un monto.
- **Editar y Eliminar Gasto**: Los gastos registrados pueden ser editados para modificar su descripción y monto, o eliminados completamente.

## Estructura de archivos

- **index.js**: Archivo principal del servidor Express.
- **index.html**: Página principal de la aplicación.
- **gastos.json y roommate.json**: Archivos JSON utilizados para almacenar datos de gastos y roommates respectivamente.
