import React from 'react';
import PropTypes from 'prop-types';

const ProductDetails = (props) => {
  const { product } = props

  return (
    <>
      <h1>Product Details</h1>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <p>{product.quantity}</p>
      <p>{product.description}</p>

    </>
  )
}

ProductDetails.propTypes = {
  product: PropTypes.object
}

export default ProductDetails
