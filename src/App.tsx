import { FormEvent, useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha o email e a senha.')
      setSubmitted(false)
      return
    }

    setError('')
    setSubmitted(true)
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-label="Formulário de login">
        <div className="login-brand">
          <span className="login-badge">Acesso seguro</span>
          <h1>Bem-vindo de volta</h1>
          <p>Entre com sua conta para continuar. Use um email válido e uma senha forte.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label className="login-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@exemplo.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="login-field">
            <span>Senha</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              minLength={6}
              required
            />
          </label>

          <div className="form-row">
            <label className="checkbox-field">
              <input type="checkbox" />
              <span>Manter-me conectado</span>
            </label>
            <button type="submit" className="login-button">
              Entrar
            </button>
          </div>

          {error ? (
            <p className="form-note error">{error}</p>
          ) : submitted ? (
            <p className="form-note success">Entrando como <strong>{email}</strong></p>
          ) : (
            <p className="form-note">Use seu email e senha para entrar no painel.</p>
          )}
        </form>

        <div className="login-footer">
          <p>
            Ainda não tem conta? <a href="#">Crie uma gratuitamente</a>
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
