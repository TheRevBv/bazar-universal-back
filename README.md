# Bazar Universal Back

- Servicio de API REST con conexion a MongoDB para proyecto de Bazar

## Requerimientos

- NodeJS >= v16.20
- Yarn >= 1.22.19
- MongoDB

## Instalación

### Ejecutar los siguientes comandos:

- Descarga el proyecto o puedes clonar desde la linea de comandos

```
git clone https://github.com/TheRevBv/bazar-universal-back.git
```

- Instalación de dependencias de desarrollo

```
cd bazar-universal-back && npm i && yarn
```

- Copiar y crear el archivo de configuración .env para agregar su cadena de conexión

```
cp .env.example .env
```

## Endpoints

### Metodos GET

### Busqueda por titulo o descripción del producto

- `api/productos?search=query`

### Listado de todos los productos

- `api/productos`

### Obtener un producto por id

- `api/productos/654bfb321274a9d503e85997`
