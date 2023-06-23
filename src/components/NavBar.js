import { useState } from 'react'
import '../App.css'
import {
  Link,
  Navbar,
  Container,
  LinkContainer,
  Badge,
  Nav,
  useContext,
  useEffect,
  Store,
  
  addToCartHandler,
  axios,
  NavDropdown,
  SearchBox,
} from '../imports'
import useCurrentLocation from '../hooks/useCurrentLocation'

function NavBar () {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state

 const currentLocation = useCurrentLocation();

  useEffect(() => {
  }, [currentLocation])

  function handleDragOver (e) {
    e.preventDefault()
  }
  async function handleDrop (e) {
    e.preventDefault()

    const productId = e.dataTransfer.getData('text/plain')

    const { data } = await axios.get(`/api/v1/products/${productId}`)
    await addToCartHandler(data, cart.cartItems, ctxDispatch)
  }

  function signoutHandler(){
      ctxDispatch({type: "USER_SIGNOUT"})
      localStorage.removeItem("userInfo");
      localStorage.removeItem("paymentMethod");
      localStorage.removeItem("shippingAddress");
  }

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
      


        {/* Cart icon */}

        <Nav
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className='ms-auto w-100 '
        >
         {currentLocation.pathname === "/"? <span></span>:  <Link className='nav-link' to='/'> <i className='fas fa-arrow-left '></i></Link>}
        {/* Logo link */}
        <LinkContainer to='/'>
          <Navbar.Brand>Eshop</Navbar.Brand>
        </LinkContainer>

      <SearchBox/>
         
          <Link to='/cart' className='nav-link'>
            <i className='fas fa-shopping-cart'></i>
            {cart.cartItems.length > 0 && (
              <Badge pill bg='danger'>
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>

          {userInfo ? (
            <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>User Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/orderhistory'>
                <NavDropdown.Item>Order History</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <Link onClick={signoutHandler} to="#signout" className='dropdown-item'>Sign out</Link>
            </NavDropdown>
          ) : (
            <Link className='nav-link' to='/signin'>
              Sign in
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
