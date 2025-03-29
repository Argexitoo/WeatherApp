# Aplicación del Clima Mundial

Esta es una aplicación web desarrollada con React y TypeScript que permite consultar el clima de cualquier ciudad del mundo utilizando la API de OpenWeatherMap.

## Características

- Búsqueda de clima por ciudad
- Visualización de temperatura en grados Celsius
- Información sobre humedad y velocidad del viento
- Interfaz de usuario moderna y responsiva
- Diseño con Material-UI

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- API Key de OpenWeatherMap

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto y agrega tu API key:
```
REACT_APP_WEATHER_API_KEY=tu_api_key_aqui
```

4. Inicia la aplicación:
```bash
npm start
```

## Uso

1. Abre tu navegador y ve a `http://localhost:3000`
2. Ingresa el nombre de una ciudad en el campo de búsqueda
3. Presiona Enter o haz clic en el botón "Buscar"
4. La información del clima se mostrará en una tarjeta debajo del campo de búsqueda

## Tecnologías Utilizadas

- React
- TypeScript
- Material-UI
- Axios
- OpenWeatherMap API

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
