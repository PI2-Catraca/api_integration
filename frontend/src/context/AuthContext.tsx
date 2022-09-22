import { createContext, useState } from 'react'
import { setCookie } from 'nookies'
import Router from 'next/router'
import axios from 'axios'

type AuthContextType = {
  isAuthenticated: boolean
  SignIn: (data: SignInData) => Promise<void>
}

type SignInData = {
  email: string
  password: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [token, setToken] = useState()
  const isAuthenticated = !!token

  async function SignIn({ email, password }: SignInData) {
    const options = {
      method: 'POST',
      // url: 'http://localhost:5000/api/usuario/login',
      url: `${process.env.NEXT_PUBLIC_API_URL}/usuario/login`,
      headers: { 'Content-Type': 'application/json' },
      data: { email: email, senha: password }
    }

    const data = await axios
      .request(options)
      .then((response) => response.data.data)
      .catch((error) => error)

    if (data.token) {
      setCookie(undefined, 'nextauth.token', data.token, {
        maxAge: 60 * 60 * 1
      })
      setToken(data.token)
      Router.push('/admin/cadastro')
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, SignIn }}>
      {children}
    </AuthContext.Provider>
  )
}
