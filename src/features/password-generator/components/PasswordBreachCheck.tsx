import { AlertTriangle, CheckCircle2, Eye, EyeOff, Search, CircleHelp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { useBreachCheck } from '../hooks/useBreachCheck'

export function PasswordBreachCheck() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const { check, result, loading, error } = useBreachCheck()

  useEffect(() => {
    if (!password) return

    const id = window.setTimeout(() => {
      void check(password)
    }, 700)

    return () => window.clearTimeout(id)
  }, [password, check])

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <Search className="h-4 w-4 text-indigo-600" />
            <span>Verificar filtración de contraseña</span>
          </h2>
          <button
            type="button"
            onClick={() => setIsHelpOpen(true)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Como funciona esta verificacion"
            title="Como funciona esta verificacion"
          >
            <CircleHelp className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1 text-sm font-medium text-gray-700">
          Verifica si una contraseña aparece en filtraciones publicas.
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Tu contraseña nunca se envía. Solo se usa un hash parcial.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Escribe o pega una contraseña"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <button
          type="button"
          onClick={() => void check(password)}
          disabled={!password || loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Search className="h-4 w-4" />
          {loading ? 'Verificando...' : 'Verificar'}
        </button>
      </div>

      {error && (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {!error && result && (
        <div
          className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
            result.breached
              ? 'border-red-200 bg-red-50 text-red-700'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700'
          }`}
        >
          {result.breached ? (
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-semibold">Comprometida</p>
                <p>Esta contraseña ha sido encontrada {result.count.toLocaleString()} veces.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-semibold">Segura</p>
                <p>No se encontró en bases de datos conocidas.</p>
              </div>
            </div>
          )}
        </div>
      )}

      <Modal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} title="Cómo funciona y por qué es seguro">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            Esta comprobación consulta un servicio público de contraseñas filtradas para saber si una
            contraseña ya fue expuesta en filtraciones.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Tu contraseña se convierte localmente a hash SHA-1 en tu navegador.</li>
            <li>Solo se envía el prefijo de 5 caracteres del hash (k-anonimato).</li>
            <li>El servidor devuelve posibles coincidencias del prefijo.</li>
            <li>La comparación final se hace localmente con el sufijo del hash.</li>
          </ul>
          <p>
            Resultado: el servidor nunca recibe tu contraseña completa ni su hash completo, reduciendo la
            exposición de datos sensibles.
          </p>
        </div>
      </Modal>
    </section>
  )
}
