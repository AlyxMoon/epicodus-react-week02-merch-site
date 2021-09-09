import React from 'react'

const ProductList = (props) => {
  // props.productList = [list of products]
  // props.product = functionToCall

  // props.product(1)

  return (
    <div className="product-list-page">
      <h1>Product List</h1>

      <ul className="product-list">
        {props.productList.map((product) => (
          <li key={product.id}>
            <div 
              className="color-col" 
              style={{ backgroundColor: product.color }}
            >
              <div>{product.name}</div>
            </div>

            <div>
              <div>{product.price}</div>
              <div>{product.description}</div>
              <div>{product.quantity}</div>
            </div>

            <div>
              <button onClick={() => props.handleUpdatingProduct(product.id)}>Update</button>
              <button onClick={() => props.handleDeletingProduct(product.id)}>Delete</button>
              <button onClick={() => props.handleSelectedProduct(product.id)}>Details</button>
            </div>            
          </li>
        ))}
      </ul>      
    </div>
  )
}



export default ProductList
