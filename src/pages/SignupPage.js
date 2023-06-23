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
  
  //import { toast } from 'react-toastify'
  
  export default function SignupPage () {
    const navigate = useNavigate()
    const { search } = useLocation()
    // Gets redirect uri if user was redirected
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'
  
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
  
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo } = state
    const submitHandler = async e => {
      e.preventDefault()

      if(password !== confirmPassword){
        toast.error("Password must match!");
        return
      }
      try {
        const { data } = await axios.post('/api/v1/users/signup', {
            name,
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
          <title>Sign Up</title>
        </Helmet>
  
        <h1 className='my-3'>Sign Up</h1>
  
        <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              required
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

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

          <Form.Group className='mb-3' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              required
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Form.Group>          
  
          <div className='mb-3'>
            <Button type='submit'>Sign Up</Button>
          </div>
  
          <div className='mb-3'>
            Already have an ccount{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
          </div>
  
        </Form>
      </Container>
    )
  }
  