import React from 'react';
import PropTypes from 'prop-types';

const ProductDetails = (props) => {
  const { product } = props

    
  // let quantityText
  // if (product.quantity <= 0) {
  //   quantityText = "Out of Stock"
  // } else {
  //   quantityText = product.quantity
  // }

  // alternative ternary mode
  // condition ? valueIftrue : valueIfFalse
  // let quantityText2 = product.quantity <= 0 ? "Out of Stock" : product.quantity

  return (
    <>
      <h1>Product Details</h1>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      
      <p>{product.quantity <= 0 ? "Out of Stock" : product.quantity}</p>
      <p>{product.description}</p>

      <button onClick={props.purchaseProduct}>Buy Now!</button>
      <button onClick={props.restockProduct}>Restock</button>
    </>
  )
}

ProductDetails.propTypes = {
  product: PropTypes.object
}

export default ProductDetails
