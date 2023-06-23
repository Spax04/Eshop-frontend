import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Route,
  Routes,
  HomePage,
  ProductPage,
  CartPage,
  Container,
  useContext,
  Store,
  NavBar,
  SigninPage,
  ToastContainer,
  ShippingAddressPage,
  SignupPage,
  PaymentPage,
  SubmitOrderPage,
  OrderPage,
  SearchPage,
  ProfilePage
} from './imports'
import HistoryOrderPage from './pages/HistoryOrderPage';


function App () {
  const { state } = useContext(Store)
  const { cart } = state


  return (
    <BrowserRouter>
      <div className='d-flex flex-column side-allpage'>
        <ToastContainer position='bottom-center' limit={1}/>
          <NavBar />
          <main>
            <Container className='mt-3'>
              {/* Routs */}
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/product/:token' element={<ProductPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/signin' element={<SigninPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/shipping' element={<ShippingAddressPage />} />
                <Route path='/payment' element={<PaymentPage />} />
                <Route path='/placeorder' element={<SubmitOrderPage />} />
                <Route path='/order/:_id' element={<OrderPage/>}/>
                <Route path='/search' element={<SearchPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path="/orderhistory" element={<HistoryOrderPage />} />
              </Routes>
            </Container>
          </main>
          <footer>
            <div className='text-center'>ALL RIGHTS RESERVED</div>
          </footer>

      </div>
    </BrowserRouter>
  )
}

export default App
