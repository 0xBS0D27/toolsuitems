# ToolSuitems

Open-source web app with productivity tools and data visualization.

**Included today:**
- **Notes** — personal writing and organization.
- **JSON Tree Visualizer** — explore JSON as a tree and graph.

**Coming soon:**
- **Kanban board** — visual task management.

## What this project is for

`ToolSuitems` is aimed at students, developers, and teams who want to:
- take quick notes in a clean, Notion-like UI,
- explore complex JSON structures visually,
- extend the codebase with new tools over time.

## Modules

### 1) Notes

Create, edit, and organize notes with local persistence.

**Features:**
- Create and edit notes.
- Search and filter by tags.
- Favorites, archive, and trash.
- Export notes to `.md` and `.txt`.

### 2) JSON Tree Visualizer

Visualize JSON as a **tree** and **graph** for easier reading and analysis.

**Features:**
- Structured view of JSON objects.
- Clear navigation across nodes and levels.
- Fast understanding of nested data.

### 3) Kanban (coming soon)

Board for tasks in columns and statuses — in development.

## Tech stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Lucide React

## Project layout

```text
src/
├── features/
│   ├── notes/       # Notes module
│   ├── json-tree/   # JSON visualizer
│   └── boards/      # Kanban (in progress)
├── components/      # Shared UI
├── hooks/           # Custom hooks
├── services/        # Storage & helpers
├── types/           # Shared types
└── styles/          # Global styles
```

## Development

### Prerequisites

- Node.js
- npm

### Clone and install

```bash
git clone https://github.com/0xBS0D27/toolsuitems.git
cd toolsuitems
npm install
```

### Run locally

```bash
npm run dev
```

The app runs at the URL Vite prints (usually `http://localhost:5173`).

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # ESLint
```

## Contributing

Contributions are welcome. Open an issue with context, or a pull request with a clear description of your changes.

## License

MIT.
