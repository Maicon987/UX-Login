import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Product } from './ProductsPage'

function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) throw new Error('Produto não encontrado')

        const data: Product = await response.json()
        setProduct(data)
      } catch {
        setError('Não foi possível carregar os detalhes deste produto.')
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [id])

  return (
    <main className="products-page">
      <header className="products-header details-header">
        <Link className="back-link" to="/produtos">
          Voltar para produtos
        </Link>
        <Link className="back-link" to="/">
          Sair
        </Link>
      </header>

      {isLoading ? <p className="products-state">Carregando detalhes...</p> : null}
      {error ? <p className="products-state error">{error}</p> : null}

      {product ? (
        <article className="product-details">
          <div className="product-details-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-details-content">
            <span className="login-badge">{product.category}</span>
            <h1>{product.title}</h1>
            <strong className="product-details-price">
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
            </strong>
            <p className="product-details-description">{product.description}</p>
            <p className="product-details-rating">
              Avaliação: <strong>{product.rating.rate.toFixed(1)} / 5</strong> ({product.rating.count} avaliações)
            </p>
          </div>
        </article>
      ) : null}
    </main>
  )
}

export default ProductDetailsPage