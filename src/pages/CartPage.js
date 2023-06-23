import {
  React,
  useContext,
  useEffect,
  Store,
  Helmet,
  MessageBox,
  Card,
  Col,
  ListGroup,
  Row,
  Button,
  Link,
  useNavigate,
  useLocation,
  axios,
  useRef
} from '../imports'

function CartPage () {
  const { state, dispatch: ctxDispatch } = useContext(Store)


  const navigate = useNavigate()

  const {
    cart: { cartItems }
  } = state

  const dragItem = useRef()
  const dragOverItem = useRef()

  useEffect(() => {
    const getCurrentLocation = async () => {
      
    }

    getCurrentLocation()
  }, [])

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/v1/products/${item._id}`)
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock')
      return
    }
    ctxDispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } })
  }

  const removeCartHandler = async item => {
    const { data } = await axios.get(`/api/v1/products/${item._id}`)

    ctxDispatch({ type: 'REMOVE_FROM_CART', payload: item })
  }

  const checkoutHandler = () => {
    // If user is not signed in, he is redirecting first to SignIn page and then to shipping page
    navigate('/signin?redirect=/shipping')
  }

  const dragStart = (e, position) => {
    dragItem.current = position
    console.log(e.target.innerHTML)
  }

  const dragEnter = (e, position) => {
    dragOverItem.current = position
    console.log(e.target.innerHTML)
  }

  const drop = (e) => {
    console.log(cartItems)
    const copyListItems = [...cartItems];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    console.log(copyListItems)
    ctxDispatch({type: "UPDATE_CART", payload:copyListItems})
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Curt</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty.
              <Link to='/'> To Home</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item,index) => (
                <ListGroup.Item
                  onDragStart={e => dragStart(e, index)}
                  onDragEnter={e => dragEnter(e, index)}
                  onDragEnd={drop}
                  key={item._id}
                >
                  <Row className='align-items-center'>
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='img-fluid rounded img-thumbnail'
                      ></img>{' '}
                      <Link
                        to={`/product/${item.token}`}
                        className='image-tumbnail'
                      >
                        {item.title}
                      </Link>
                    </Col>
                    <Col md={3}>
                      {/* ------ */}
                      <Button
                        variant='light'
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <i className='fas fa-minus-circle'></i>
                      </Button>
                      <span>{item.quantity}</span>
                      {/* +++++ */}
                      <Button
                        variant='light'
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className='fas fa-plus-circle'></i>
                      </Button>
                    </Col>
                    <Col md={3}>{item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant='light'
                        onClick={() => removeCartHandler(item)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items:) : ${' '}
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button
                      type='button'
                      variant='primary'
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartPage
