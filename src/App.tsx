import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type User = {
  name: {
    firstname: string
    lastname: string
  }
  email: string
  phone: string
  address: {
    city: string
    street: string
    number: number
    zipcode: string
  }
}

function App() {
  const [username, setUsername] = useState('johnd')
  const [password, setPassword] = useState('m38rmF$')
  const [token, setToken] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!username.trim() || !password.trim()) {
      setError('Por favor, preencha o usuário e a senha.')
      setToken('')
      setUser(null)
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const loginResponse = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!loginResponse.ok) {
        throw new Error('Login inválido')
      }

      const loginData = await loginResponse.json()
      setToken(loginData.token)

      const userResponse = await fetch('https://fakestoreapi.com/users/2')
      const userData = await userResponse.json()
      setUser(userData)
    } catch {
      setToken('')
      setUser(null)
      setError('Falha no login. Verifique as credenciais e tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-label="Formulário de login">
        {!token ? (
          <>
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
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="johnd"
                  autoComplete="username"
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
          </>
        ) : (
          <div className="welcome-box">
            <h2>Bem-vindo, {user?.name.firstname} {user?.name.lastname}</h2>
            <p>Email: {user?.email}</p>
            <p>Telefone: {user?.phone}</p>
            <p>
              Endereço: {user?.address.street}, {user?.address.number} - {user?.address.city} ({user?.address.zipcode})
            </p>
            <p>Token:</p>
            <code>{token}</code>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
