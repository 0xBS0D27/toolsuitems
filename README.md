# ToolSuitems

Colección open-source de herramientas web orientadas a productividad y visualización de datos, ejecutadas en frontend.

## Módulos actuales

- **Notas**: creación, edición, favoritos, archivado, búsqueda y exportación.
- **JSON Tree**: visualización de JSON en editor + árbol/gráfico interactivo.
- **Generador de contraseñas**:
  - generación local con `crypto.getRandomValues()`,
  - medición de fortaleza por entropía,
  - verificación de filtraciones con modelo k-anonimato (HIBP Pwned Passwords API).

## Próximamente

- **Tablero Kanban** para organización visual de tareas.

## Stack técnico

- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Lucide React

## Estructura del proyecto

```text
src/
├── components/      # UI compartida
├── features/        # Módulos por herramienta
│   ├── notes/
│   ├── json-tree/
│   ├── password-generator/
│   └── boards/
├── hooks/
├── services/
├── types/
└── styles/
```

## Desarrollo local

### Requisitos

- Node.js
- npm

### Instalación

```bash
git clone https://github.com/0xBS0D27/toolsuitems.git
cd toolsuitems
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

### Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm audit
```

## Seguridad (importante para repositorio público)

### Modelo de datos y privacidad

- No existe backend propio para notas o contraseñas.
- Las notas se guardan en `localStorage` del navegador del usuario.
- El generador de contraseñas no almacena contraseñas en persistencia local.
- La verificación de filtración usa **k-anonimato**:
  - se calcula hash SHA-1 en cliente,
  - solo se envían 5 caracteres del prefijo del hash,
  - la comparación del sufijo se realiza localmente.

### Cabeceras de seguridad en despliegue

En `vercel.json` se incluyen cabeceras de endurecimiento:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` para deshabilitar APIs sensibles no usadas.

### Buenas prácticas para contribuir

- No subir secretos (`.env`, tokens, claves privadas).
- No registrar contraseñas ni datos sensibles en consola.
- Evitar librerías innecesarias y revisar `npm audit` antes de publicar.
- Mantener dependencias actualizadas y revisar changelogs de seguridad.

### Hallazgos actuales de dependencias (audit)

Al momento de la revisión, `npm audit` reporta vulnerabilidades transitivas en:

- `dompurify` (a través de `monaco-editor`)
- `esbuild` (a través de `vite` en entorno de desarrollo)
- `flatted` (cadena de dependencias de lint/caché)

Estas dependen en gran parte de terceros y/o de actualizaciones mayores. Se recomienda:

1. Ejecutar `npm audit fix` para correcciones no disruptivas.
2. Planificar actualización mayor de `vite` y revisar compatibilidad.
3. Repetir auditoría en CI antes de cada release público.

## Contribuciones

Se aceptan contribuciones vía issues y pull requests con contexto técnico claro.

## Licencia

MIT.
