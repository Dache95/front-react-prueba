# React Assignment App

Esta es una aplicación de asignación de solicitudes construida con React. La aplicación permite ver los detalles de una solicitud y asignarla a un usuario utilizando diferentes métodos de asignación (aleatorio, por equidad o directamente).

## Descripción

La aplicación está diseñada para gestionar la asignación de solicitudes a usuarios de forma eficiente. Utiliza una API REST para obtener los detalles de las solicitudes, los usuarios disponibles y las asignaciones existentes. El usuario puede elegir el método de asignación deseado y asignar la solicitud a un usuario en función de diferentes criterios.

### Características principales

- **Ver detalles de la solicitud**: Muestra los detalles de la solicitud seleccionada, como el título, la descripción y el estado.
- **Asignación flexible**: Permite asignar la solicitud utilizando uno de los siguientes métodos:
  - **Aleatorio**: Asigna la solicitud a un usuario seleccionado al azar.
  - **Por Equidad**: Asigna la solicitud al usuario con menos tareas asignadas dentro de un rol específico.
  - **Directamente**: Asigna la solicitud a un usuario seleccionado manualmente.
- **Usuarios y roles**: Los usuarios se filtran según su rol, y se puede ver cuántas tareas tiene cada usuario en el sistema.

## Tecnologías utilizadas

- **React**: Para la construcción de la interfaz de usuario y manejo del estado.
- **React Router**: Para la navegación dentro de la aplicación.
- **Hooks personalizados**: Para la gestión de las solicitudes HTTP y el estado de la aplicación.
- **Tailwind CSS**: Para el diseño y la estilización de la interfaz de usuario.
- **API REST**: Consumo de datos de solicitudes, usuarios y asignaciones desde una API externa.

## Despliegue

La aplicación está desplegada en [Netlify](https://www.netlify.com/) y puedes acceder a ella mediante el siguiente enlace:

[https://front-preuba-react.netlify.app/](https://front-preuba-react.netlify.app/)

## Instalación y uso localmente

Si deseas ejecutar esta aplicación en tu entorno local, sigue los siguientes pasos:

1. Clona el repositorio:
   [git clone https://github.com/tu-usuario/tu-repo.git](https://github.com/Dache95/front-react-prueba.git)
   cd front-react-prueba
   yarn install
   yarn dev




