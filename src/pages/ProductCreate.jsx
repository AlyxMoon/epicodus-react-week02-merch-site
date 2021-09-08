import React from 'react';
import {v4} from 'uuid';
import PropTypes from 'prop-types'

function ProductCreate (props) {

  function createNewProduct(event) {
    event.preventDefault();

    props.onNewProductCreation({
      product: event.target.product.value,
      color: event.target.color.value,
      price: event.target.price.value,
      description: event.target.description.value,
      quantity: event.target.quantity.value,
      id: v4()
    });
  }

  return (
    <form onSubmit={createNewProduct}>
      <input
        type='text'
        name='product'
        placeholder='Product Name' />

      <label>Product Color:</label>
      <input
        type='color'
        name='color' />

      <label>Price:</label>
      <input
        type='number'
        name='price'
        placeholder='$1.99' />
        
      <textarea
        name='description'
        placeholder='Describe the Product' />

      <label>Quantity:</label>
      <input
        type='number'
        name='quantity'
        placeholder='1' />
      <button type='submit'>Add Product</button>
    </form>
  )  
}

ProductCreate.propTypes = {
  onNewProductCreation: PropTypes.func
}

export default ProductCreate;