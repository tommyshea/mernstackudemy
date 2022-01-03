import { Segment } from 'semantic-ui-react'
import CartItemList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'
import { parseCookies } from 'nookies'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'

function Cart({ products }) {
  return (
    <Segment>
      <CartItemList products={products} />
      <CartSummary />
    </Segment>  
  );
}

Cart.getInitialProps = async ctx => {
  const { merntoken } = parseCookies(ctx)
  if (!merntoken) {
    return { products: [] }
  }
  const url = `${baseUrl}/api/cart`
  const payload = { 
    headers: {
      Authorization: merntoken
    }
  }
  const response = await axios.get(url, payload)
  return {
    products: response.data
  }
}

export default Cart;
