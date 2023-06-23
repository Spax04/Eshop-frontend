import {
  axios,
  Link,
  useLocation,
  useNavigate,
  Container,
  Form,
  Button,
  Helmet,
  useContext,
  useEffect,
  useState,
  Store,
  getError,
  LocationContext,
  toast
} from '../imports'


export default function SigninPage () {
  const navigate = useNavigate()
  const { search } = useLocation()
  // Gets redirect uri if user was redirected
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state
  const submitHandler = async e => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/v1/users/signin', {
        email,
        password
      })
      ctxDispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))

      // If user was in diffrend page, after signing in, automatacly redirect to page when he was, or to HomePage
      navigate(redirect || '/')
    } catch (err) {
      //alert(getError(err))
      toast.error(getError(err))
    }
  }

  useEffect(() => {
    // When user get to this page, he is automatacly redirecting to "redirect" page.
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  return (
    <Container className='small-container'>
      <Helmet>
        <title>Sign In</title>
      </Helmet>

      <h1 className='my-3'>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            required
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            required
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className='mb-3'>
          <Button type='submit'>Sign In</Button>
        </div>

        <div className='mb-3'>
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>

        <div className='mb-3'>
          Forget Password? <Link to={`/forget-password`}>Reset Password</Link>
        </div>
      </Form>
    </Container>
  )
}
