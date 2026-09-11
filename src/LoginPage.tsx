import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: 'johnd', password: 'm38rmF$' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: 'username' | 'password') => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.username.trim() || !form.password.trim()) {
      setError('Preencha usuário e senha.')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error('Login inválido')

      navigate('/produtos')
    } catch {
      setError('Falha no login. Verifique as credenciais.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-label="Formulário de login">
        <div className="login-brand">
          <span className="login-badge">Acesso seguro</span>
          <h1>Bem-vindo de volta</h1>
          <p>Entre com sua conta para continuar.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label className="login-field">
            <span>Usuário</span>
            <input
              type="text"
              value={form.username}
              onChange={handleChange('username')}
              placeholder="johnd"
              autoComplete="username"
              required
            />
          </label>

          <label className="login-field">
            <span>Senha</span>
            <input
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          <div className="form-row">
            <label className="checkbox-field">
              <input type="checkbox" />
              <span>Manter-me conectado</span>
            </label>
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>

          {error ? <p className="form-note error">{error}</p> : null}

          {!error && !isLoading ? (
            <p className="form-note">Use o usuário e a senha válidos para autenticar.</p>
          ) : null}
        </form>
      </section>
    </main>
  )
}

export default LoginPage