import React from 'react';
import {v4} from 'uuid';
import PropTypes from 'prop-types'

class ProductUpdateWithState extends React.Component {
  constructor (props) {
    super()

    this.state = {
      ...props.product,
    }
  }

  handleOnChange (value, property) {
    this.setState({
      [property]: value,
    })
  }

  render () {
    const product = this.state || {}

    function updateSelectedProduct(event) {
      event.preventDefault();

      this.props.onUpdatingProduct(this.state);
    }

    return (
      <form onSubmit={updateSelectedProduct}>
        <input
          type='text'
          name='name'
          placeholder='Product Name' 
          value={product.name}
          onChange={(event) => this.handleOnChange(event.target.value, 'name')}
          />

        <label>Product Color:</label>
        <input
          type='color'
          name='color'
          value={product.color} 
          onChange={(event) => this.handleOnChange(event.target.value, 'color')}
        />

        <label>Price:</label>
        <input
          type='number'
          name='price'
          value={product.price}
          placeholder='$1.99' />
          
        <textarea
          name='description'
          value={product.description}
          placeholder='Describe the Product' />

        <label>Quantity:</label>
        <input
          type='number'
          name='quantity'
          value={product.quantity}
          placeholder='1' />
        <button type='submit'>Update Product</button>
      </form>
    )
  }
}

function ProductUpdate (props) {
  const { product } = props

  function updateSelectedProduct(event) {
    event.preventDefault();

    props.onUpdatingProduct({
      name: event.target.name.value,
      color: event.target.color.value,
      price: event.target.price.value,
      description: event.target.description.value,
      quantity: event.target.quantity.value,
      id: v4()
    });
  }

  return (
    <form onSubmit={updateSelectedProduct}>
      <input
        type='text'
        name='name'
        defaultValue={product.name}
        placeholder='Product Name' />

      <label>Product Color:</label>
      <input
        type='color'
        name='color'
        defaultValue={product.color} />

      <label>Price:</label>
      <input
        type='number'
        name='price'
        defaultValue={product.price}
        placeholder='$1.99' />
        
      <textarea
        name='description'
        defaultValue={product.description}
        placeholder='Describe the Product' />

      <label>Quantity:</label>
      <input
        type='number'
        name='quantity'
        defaultValue={product.quantity}
        placeholder='1' />
      <button type='submit'>Update Product</button>
    </form>
  )  
}

ProductUpdate.propTypes = {
  onUpdatingProduct: PropTypes.func
}

export default ProductUpdateWithState;


