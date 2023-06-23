import {
  Link,
  useNavigate,
  Button,
  Rating,
  Card,
  useContext,
  Store,
  axios,
  getError,
  addToCartHandler
} from '../imports'

//import logger from 'use-reducer-logger'

function Product (props) {
  const navigate = useNavigate()
  const { product } = props
  const { state, dispatch: ctxDispatch } = useContext(Store)

  const { cart } = state

  const addToCart = async () => {
    const { data } = await axios.get(`/api/v1/products/${product._id}`)
    addToCartHandler(data, cart.cartItems, ctxDispatch)
  }

  // When user drags an object, it contains product._id and keep it if format "text/plain"
  const handleDragStart = e => {
    e.dataTransfer.setData('text/plain', product._id)
  }

  return (
    <Card
      draggable='true'
      onDragStart={handleDragStart}
      className='product-card'
    >
      <div className='div-img'>
        <Link to={`/product/${product.token}`}>
          <Card.Img
            variant='top'
            alt={product.title}
            src={product.image}
          ></Card.Img>
        </Link>
      </div>
      <Card.Body>
        <Link to={`/product/${product.token}`}>
          <Card.Title>{product.title}</Card.Title>
        </Link>
        <Card.Text>{product.price + '$'}</Card.Text>
        <Rating
          rating={product.rating.rate}
          numOfReviews={product.rating.count}
        /> 
        {product.countInStock > 0 ? (
          <Button onClick={addToCart}>Add to card</Button>
        ) : (
          <Button onClick={addToCart} variant='white' disabled={true}>
            Out of Stock
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default Product
