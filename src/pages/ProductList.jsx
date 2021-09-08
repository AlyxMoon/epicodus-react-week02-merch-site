import React from 'react'

const ProductList = (props) => {

  return (
    <div className="product-list-page">
      <h1>Product List</h1>

      <ul className="product-list">
        {props.productList.map((product) => (
          <li key={product.id}>
            <div 
              className="color-col" 
              style={{ 'background-color': product.color }}
            >
              <div>{product.name}</div>
            </div>

            <div>
              <div>{product.price}</div>
              <div>{product.description}</div>
              <div>{product.quantity}</div>
            </div>

            <div>
              <button>Update</button>
              <button>Delete</button>
            </div>            
          </li>
        ))}
      </ul>      
    </div>
  )
}



export default ProductList
