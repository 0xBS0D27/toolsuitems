const sampleJson = Object.freeze({
  name: 'ToolSuitems',
  version: '1.0.0',
  tools: ['Notas', 'Tablero', 'JSON Tree'],
  jsonTree: {
    description: 'Visualiza JSON en forma de árbol',
    features: ['Editor', 'Gráfico', 'Zoom'],
  },
})

export const JSON_TEMPLATE = JSON.stringify(sampleJson, null, 2)
