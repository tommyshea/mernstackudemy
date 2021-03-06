import React, { useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList'
import baseUrl from '../utils/baseUrl'

const Home = ({ products }) => {
  //console.log(products)
  return (
    <ProductList 
      products={products}
    />
  )
}

Home.getInitialProps = async () => {
  // fetch data on server
  const url = `${baseUrl}/api/products`
  const response = await axios.get(url);
  //console.log(response.data);
  // return response data as an object
  return { products: response.data };
  // note: this object will be merged with existing props
}

export default Home;
