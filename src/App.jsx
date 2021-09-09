import React from 'react';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import ProductCreate from './pages/ProductCreate';
import ProductUpdate from './pages/ProductUpdate';

import * as api from './lib/api'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      page: 0,
      fullProductList: [],
      selectedProduct: null,
      itemsInCart: []
    }
  }

  async componentDidMount () {
    const products = await api.getProducts()
    this.setState({
      fullProductList: products,
    })
  }

  updatePage (newPage = 0) {
    this.setState({
      page: newPage,
    })
  }

  addNewProductToList = (newProduct) => {
    this.setState({ 
      fullProductList: this.state.fullProductList.concat(newProduct), 
      page: 0 
    }, () => {
      api.updateProducts(this.state.fullProductList)
    });
  }

  handleSelectedProduct = (id) => {
    this.setState({
      selectedProduct: this.state.fullProductList.find(product => product.id === id),
      page: 1
    })
  }

  handleDeletingProduct = (id) => {
    this.setState({
      fullProductList: this.state.fullProductList.filter(product => product.id !== id),
      selectedProduct: null
    }, () => {
      api.updateProducts(this.state.fullProductList)
    })
  }

  handleUpdatingProduct = (id) => {
    this.setState({
      selectedProduct: this.state.fullProductList.find(product => product.id === id),
      page: 3
    })
  }

  updateProduct = (editProduct) => {
    // get index of product to update
    // findIndex this.state.selectedProduct
    // reassign the item at that index to updated product

    // set list state again
    const index = this.state.fullProductList.findIndex(product => product.id === this.state.selectedProduct.id)

    this.state.fullProductList[index] = editProduct
    this.setState({
      fullProductList: this.state.fullProductList,
      page: 0
    })
  }

  purchaseProduct = () => {
    const index = this.state.fullProductList.findIndex(product => product.id === this.state.selectedProduct.id)

    this.state.fullProductList[index].quantity--
    if (this.state.fullProductList[index].quantity < 0) {
      this.state.fullProductList[index].quantity = 0
    }

    // this.state.fullProductList[index].quantity = Math.max(
    //   this.state.fullProductList[index].quantity - 1,
    //   0
    // )

    this.setState({
      fullProductList: this.state.fullProductList,
      page: 0,
      itemsInCart: this.state.itemsInCart.concat(this.state.fullProductList[index].name)
    })
  }
    
  restockProduct = () => {
    const index = this.state.fullProductList.findIndex(product => product.id === this.state.selectedProduct.id)
    this.state.fullProductList[index].quantity++
    this.setState({
      fullProductList: this.state.fullProductList,
    })
  }

  removeCartItem = (indexToRemove) => {
    // ['name1', 'name2', 'name3']
    this.setState({
      itemsInCart: this.state.itemsInCart.filter((_, index) => index != indexToRemove)
    })
  }


  render () {
    let pageView
// could have used an array
    if (this.state.page === 0) {
      pageView = (
        <ProductList 
          productList={this.state.fullProductList}
          handleSelectedProduct={this.handleSelectedProduct}
          handleDeletingProduct={this.handleDeletingProduct}
          handleUpdatingProduct={this.handleUpdatingProduct}
          // editing method
        />
      )
    } else if (this.state.page === 1) {
      pageView = (
        <ProductDetails 
          product = {this.state.selectedProduct}
          purchaseProduct={this.purchaseProduct}
          restockProduct={this.restockProduct}
        />
      )
    } else if (this.state.page === 2) {
      pageView = (
        <ProductCreate 
          onNewProductCreation={(product) => this.addNewProductToList(product)} 
        />
      )
    } else if (this.state.page === 3) {
      pageView = (
        <ProductUpdate 
          product = {this.state.selectedProduct} 
          onUpdatingProduct={(editProduct) => this.updateProduct(editProduct)}
        />
      )
    }

    return (
      <div className="App">
        <nav>
          <button onClick={() => this.updatePage(0)}>
            Product List
          </button>
          <button onClick={() => this.updatePage(2)}>
            Create Product
          </button>
        </nav>

        <section>
          {this.state.itemsInCart.map((item, index) => (
            <div>
              <p>{item}</p>
              <button onClick={() => this.removeCartItem(index)}>Remove</button>
            </div>
          ))}
        </section>
  
        {pageView} 
      </div>
    )

    /* alternative way with array!
    const views = [
      <ProductList 
        productList={this.state.fullProductList}
        handleSelectedProduct={this.handleSelectedProduct}
        handleDeletingProduct={this.handleDeletingProduct}
      />,
      <ProductDetails 
        product = {this.state.selectedProduct} 
      />,
      <ProductCreate 
        onNewProductCreation={(product) => this.addNewProductToList(product)} 
      />
    ]

    return (
      <div className="App">
        <nav>
          <button onClick={() => this.updatePage(0)}>
            Product List
          </button>
          <button onClick={() => this.updatePage(2)}>
            Create Product
          </button>
        </nav>
  
        {views[this.state.page]} 
      </div>
    )
    */
  }
}

// function App () {
//   let page = 0

//   function updatePage () {
//     page++
//   }

//   return (
//     <div className="App">
//       <button onClick={updatePage} />

//       {page === 0 && <ProductList />}
//       <ProductDetails />
//       <ProductCreate />
//     </div>
//   );
// }

export default App;
