import Editor from '@monaco-editor/react'
import { useApp } from '@/features/json-tree/store/useApp'
import { useStored } from '@/features/json-tree/store/useStored'

const editorOptions = {
  formatOnPaste: true,
  formatOnType: true,
  minimap: { enabled: false },
}

export function MonacoEditor() {
  const contents = useApp((s) => s.contents)
  const setContents = useApp((s) => s.setContents)
  const setError = useApp((s) => s.setError)
  const lightmode = useStored((s) => s.lightmode)

  return (
    <Editor
      className="h-full w-full"
      language="json"
      height="100%"
      theme={lightmode ? 'light' : 'vs-dark'}
      value={contents}
      options={editorOptions}
      onValidate={(errors) => setError(errors?.[0]?.message ?? null)}
      onChange={(value) => setContents({ contents: value ?? '', skipUpdate: false })}
    />
  )
}
