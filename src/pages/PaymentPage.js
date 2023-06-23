import {
  CheckoutSteps,
  Container,
  Helmet,
  Form,
  Button,
  useNavigate,
  useContext,
  Store,
  useEffect,
  useState
} from '../imports'

function PaymentPage () {

  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    cart: { shippingAddress, paymentMethod }
  } = state
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || 'PayPal'
  )

  const submitHandler = e => {
    e.preventDefault()

    ctxDispatch({type: "SAVE_PAYMENT_METHOD",payload:paymentMethodName})
    localStorage.setItem('paymentMethod',JSON.stringify(paymentMethodName))
    navigate('/placeorder');
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [navigate, shippingAddress])
  return (
    <div>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 />

      <Container className='small-container'>
        <h1 className='my-3'>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='PayPal'
              label='PayPal'
              value='PayPal'
              checked={paymentMethodName === 'PayPal'}
              onChange={e => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='Stripe'
              label='Stripe'
              value='Stripe'
              checked={paymentMethodName === 'Stripe'}
              onChange={e => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <Button type='submit'>Continue</Button>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default PaymentPage
