# ToolSuitems

Proyecto web de codigo abierto con herramientas de productividad y visualizacion de datos.

Actualmente incluye:
- **Notas** para escritura y organizacion personal.
- **JSON Tree Visualizer** para visualizar JSON en forma de arbol y grafo.

Proximamente:
- **Tablero Kanban** para gestion visual de tareas.

## Que resuelve este proyecto

`ToolSuitems` esta pensado para estudiantes, desarrolladores y equipos que necesitan:
- tomar notas rapidas con una experiencia limpia tipo Notion,
- explorar estructuras JSON complejas de forma visual,
- y trabajar sobre una base extensible para nuevas herramientas.

## Modulos disponibles

### 1) Notas
Permite crear, editar y organizar notas con guardado local.

Funciones principales:
- Crear y editar notas.
- Busqueda por contenido y filtro por etiquetas.
- Favoritos, archivado y papelera.
- Exportacion de notas a `.md` y `.txt`.

### 2) JSON Tree Visualizer
Herramienta para visualizar datos JSON en vistas de **arbol** y **grafo** para facilitar su lectura y analisis.

Funciones principales:
- Visualizacion estructurada de objetos JSON.
- Navegacion clara entre nodos y niveles.
- Enfoque en comprension rapida de datos anidados.

### 3) Kanban (proximamente)
Modulo en desarrollo para organizar tareas por columnas y estados.

## Stack tecnologico

- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Lucide React

## Estructura general

```text
src/
├── features/
│   ├── notes/       # Modulo de notas
│   ├── json-tree/   # Modulo visualizador JSON
│   └── boards/      # Modulo Kanban (en progreso)
├── components/      # Componentes compartidos
├── hooks/           # Hooks personalizados
├── services/        # Persistencia y utilidades
├── types/           # Tipos compartidos
└── styles/          # Estilos globales
```

## Development setup

Pasos para ejecutar el proyecto en local despues de clonar el repositorio.

### Step 1 - Requisitos
Necesitas tener instalado:
- Node.js
- npm

### Step 2 - Clonar e instalar dependencias

```bash
git clone https://github.com/<tu-usuario>/<tu-repo>.git
cd <tu-repo>
npm install
```

### Step 3 - Ejecutar la app

```bash
npm run dev
```

La aplicacion quedara disponible en la URL que indique Vite (normalmente `http://localhost:5173`).

## Scripts

```bash
npm run dev      # entorno de desarrollo
npm run build    # build de produccion
npm run preview  # previsualizar build
npm run lint     # revisar calidad de codigo
```

## Contribuciones

Las contribuciones son bienvenidas. Si quieres proponer mejoras:
- abre un issue con el contexto,
- o crea un pull request con una descripcion clara del cambio.

## Licencia

Licenciado bajo MIT.
