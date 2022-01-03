import { useState, useEffect } from 'react'
import { Input, Button } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import catchErrors from '../../utils/catchErrors'
import cookie from 'js-cookie'

const AddProductToCart = ({ user, productId }) => {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let timeout
    if (success) {
      timeout = setTimeout(() => setSuccess(false), 2000)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [success])

  const handleAddProductToCart = async () => {
    try {
      setLoading(true)
      const url = `${baseUrl}/api/cart`
      const payload = { quantity, productId }
      const merntoken = cookie.get('merntoken')
      const headers = { 
        headers: {
          Authorization: merntoken
        }
      }
      const response = await axios.put(url, payload, headers)
      setSuccess(true)
    } catch (error) {
      catchErrors(error, window.alert)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    {user && success ? (
      <Input 
        type="number"
        min="1"
        placeholder="Quantity"
        value={quantity}
        //onChange={event => setQuantity(Number(event.target.value))}
        action={{ 
          color: 'blue',
          content: 'Item Added!',
          icon: "plus cart",
          disabled: true
          //onClick: handleAddProductToCart
        }}
      />
    ) : user ? (
      <Input 
        type="number"
        min="1"
        placeholder="Quantity"
        value={quantity}
        onChange={event => setQuantity(Number(event.target.value))}
        action={{ 
          loading,
          disabled: loading,
          color: 'orange',
          content: 'Add to Cart',
          icon: "plus cart",
          onClick: handleAddProductToCart
        }}
      />
    ) : (
      <Button 
        color='blue'
        content='Sign Up To Purchase'
        icon='signup'
        onClick={() => router.push('/signup')}
      />
    )}
    </>
  );
}

export default AddProductToCart;
