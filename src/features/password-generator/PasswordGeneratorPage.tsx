import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { PasswordControls } from './components/PasswordControls'
import { PasswordBreachCheck } from './components/PasswordBreachCheck'
import { PasswordDisplay } from './components/PasswordDisplay'
import { PasswordStrength } from './components/PasswordStrength'
import { usePasswordGenerator } from './hooks/usePasswordGenerator'

export function PasswordGeneratorPage() {
  const {
    length,
    setLength,
    options,
    toggleOption,
    autoCopy,
    setAutoCopy,
    password,
    generate,
    copied,
    copyPassword,
    isMasked,
    setIsMasked,
    entropy,
    strength,
    version,
    charsetLength,
  } = usePasswordGenerator()

  useEffect(() => {
    void generate()
  }, [generate])

  const hasCharset = charsetLength > 0

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/40">
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              <LockKeyhole className="h-8 w-8 text-violet-600 sm:h-9 sm:w-9" />
              <span>Generador de contraseñas</span>
            </h1>
          </div>
          <Link
            to="/"
            className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Volver
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="order-1 lg:order-1">
            <PasswordDisplay
              password={password}
              isMasked={isMasked}
              copied={copied}
              version={version}
              onToggleMask={() => setIsMasked((v) => !v)}
              onCopy={() => void copyPassword()}
              onRegenerate={() => void generate()}
            />
          </div>

          <div className="order-2 lg:order-3">
            <PasswordStrength entropy={entropy} strength={strength} />
          </div>

          <div className="order-3 lg:order-2">
            <PasswordControls
              length={length}
              options={options}
              autoCopy={autoCopy}
              onLengthChange={setLength}
              onToggleOption={toggleOption}
              onToggleAutoCopy={() => setAutoCopy((v) => !v)}
            />
          </div>

          <div className="order-4 lg:order-4">
            <PasswordBreachCheck />
          </div>
        </div>

        {!hasCharset && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Activa al menos un tipo de caracter para generar una contrasena.
          </p>
        )}
      </main>
    </div>
  )
}
