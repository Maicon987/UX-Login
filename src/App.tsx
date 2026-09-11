import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './LoginPage'
import ProductDetailsPage from './ProductDetailsPage'
import ProductsPage from './ProductsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/produtos" element={<ProductsPage />} />
      <Route path="/produtos/:id" element={<ProductDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
