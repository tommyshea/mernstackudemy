import { Card } from 'semantic-ui-react'

const ProductList = ({ products }) => {

  const mapProductsToItems = (products) => 
    products.map(product => ({
      header: product.name,
      image: product.mediaUrl,
      meta: `$${product.price}`,
      color: 'teal',
      fluid: true,
      childKey: product._id,
      href: `/product?_id=${product._id}`
    }))

  return (
    <Card.Group 
      itemsPerRow="3"
      centered 
      stackable 
      items={mapProductsToItems(products)} 
    />
  )
}

export default ProductList;
