import {
  React,
  useLocation,
  useNavigate,
  useParams,
  useEffect,
  useReducer,
  useContext,
  axios,
  Row,
  Col,
  ListGroup,
  Rating,
  Card,
  Button,
  Badge,
  Helmet,
  Loading,
  MessageBox,
  getError,
  Store,
  UploadingReducer,
  addToCartHandler,
} from '../imports'

function ProductPage () {
  const navigate = useNavigate()
  const params = useParams()

  const { token } = params

  const [{ loading, error, product }, dispatch] = useReducer(UploadingReducer, {
    loading: true,
    error: '',
    product: []
  })

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: 'GET_REQUEST' })

      try {
        const res = await axios.get(`/api/v1/products/token/${token}`) //try catch

        dispatch({ type: 'GET_SUCCESS', payload: res.data })
      } catch (err) {
        dispatch({ type: 'GET_FAIL', payload: getError(err) })
      }

      //setProducts(res.data);
    }
    getProduct()

  }, [token])

  // Calling reducer from Store context to add elemnts to cart
  const { state, dispatch: ctxDispatch } = useContext(Store)

  const { cart } = state

  const addToCart = async () => {
    const { data } = await axios.get(`/api/v1/products/${product._id}`)

    addToCartHandler(data, cart.cartItems, ctxDispatch)
    navigate('/cart')
  }

  return (
    <div>

      <Helmet>
        <title>Product page</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <Row>
          <Col md={6}>
            <div className='prodImg'>
            <img
              src={product.image}
              alt={product.title}
              className='w-100'
            />
            </div>
            
          </Col>

          {/* Product information 1*/}
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.title}</h1>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  rating={product.rating.rate}
                  numOfReviews={product.rating.count}
                ></Rating>
              </ListGroup.Item>

              <ListGroup.Item>Pirce : ${product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description:
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Product information 2*/}
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg='success'>In Stock</Badge>
                        ) : (
                          <Badge bg='danger'>Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Button Add to Cart*/}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className='d-grid'>
                        <Button
                          onClick={() => addToCart(product)}
                          variant='primary'
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default ProductPage
