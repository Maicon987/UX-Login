import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export type Product = {
  id: number
  title: string
  price: number
  image: string
  category: string
  description: string
  rating: {
    rate: number
    count: number
  }
}

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok) throw new Error('Falha ao carregar produtos')

        const data: Product[] = await response.json()
        setProducts(data.slice(0, 20))
      } catch {
        setError('Não foi possível carregar os produtos. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <main className="products-page">
      <header className="products-header">
        <div>
          <span className="login-badge">Catálogo</span>
          <h1>Produtos</h1>
          <p>Encontre seus próximos favoritos.</p>
        </div>
        <Link className="back-link" to="/">
          Sair
        </Link>
      </header>

      {isLoading ? <p className="products-state">Carregando produtos...</p> : null}
      {error ? <p className="products-state error">{error}</p> : null}

      {!isLoading && !error ? (
        <section className="products-grid" aria-label="Lista de produtos">
          {products.map((product) => (
            <Link className="product-card" key={product.id} to={`/produtos/${product.id}`}>
              <div className="product-image-wrap">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-content">
                <h2>{product.title}</h2>
                <strong>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}</strong>
              </div>
            </Link>
          ))}
        </section>
      ) : null}
    </main>
  )
}

export default ProductsPage