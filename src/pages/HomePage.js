import {
  useEffect,
  useReducer,
  useContext,
  useLocation,
  axios,
  Row,
  Col,
  Product,
  Loading,
  getError,
  MessageBox,
  UploadingReducer,
  Helmet

} from '../imports'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  main: {
    breakpoint: { max: 3000, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
}

function HomePage () {
  const [{ loading, error, product }, dispatch] = useReducer(UploadingReducer, {
    loading: true,
    error: '',
    product: []
  })

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: 'GET_REQUEST' })

      try {
        const res = await axios.get(`/api/v1/products`)
        dispatch({ type: 'GET_SUCCESS', payload: res.data })
      } catch (err) {
        dispatch({ type: 'GET_FAIL', payload: getError(err) })
      }

      //setProducts(res.data);
    }
    getProducts()
  }, [])

  return (
    <div className='homePage'>
      <Helmet>
        <title>Eshop - Home</title>
      </Helmet>
      <div className='carousel'>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={false} // means to render carousel on server-side.
          infinite={true}
          keyBoardControl={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          customTransition='all .5'
          transitionDuration={500}
          containerClass='carousel-container'
          removeArrowOnDeviceType={'main'}
          dotListClass='custom-dot-list-style'
          itemClass='carousel-item-padding-40-px'
        >
          <div>
            <img
              className='carousel-image'
              src='https://m.media-amazon.com/images/I/61PRFOFwuRL._SX3000_.jpg'
              alt='carousel'
            />
          </div>
          <div>
            <img
              className='carousel-image'
              src='https://m.media-amazon.com/images/I/71Lv8RkYimL._SX3000_.jpg'
              alt='carousel'
            />
          </div>
          <div>
            <img
              className='carousel-image'
              src='https://m.media-amazon.com/images/I/71tMlGMklPL._SX3000_.jpg'
              alt='carousel'
            />
          </div>
          <div>
            <img
              className='carousel-image'
              src='https://m.media-amazon.com/images/I/71rzmcWTcTL._SX3000_.jpg'
              alt='carousel'
            />
          </div>
        </Carousel>
      </div>
      <div className='homeContent'>

        <h1>Products</h1>
        <div className='main-inner'>
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
          ) : (
            <Row>
              {product.map(product => (
                <Col key={product.token} lg={3} md={4} sm={6}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>

    </div>
  )
}

export default HomePage
