import React from 'react'
import { connect } from 'react-redux'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import ProductCreate from './pages/ProductCreate'
import ProductUpdate from './pages/ProductUpdate'
import * as api from './lib/api'

export class App extends React.Component {
  constructor () {
    super()

    // this.props.products
    // this.props.products

    this.state = {
      page: 0,
      products: [],
      selectedProduct: null,
      itemsInCart: []
    }
  }

  async componentDidMount () {
    const products = await api.getProducts()
    this.setState({
      products: products,
    })
  }

  updatePage (newPage = 0) {
    this.setState({
      page: newPage,
    })
  }

  addNewProductToList = (newProduct) => {
    this.props.addProduct(newProduct)
    // this.props.dispatch({
    //   type: 'ADD_PRODUCT',
    //   product: {
    //     ...newProduct,
    //   },
    // })

    this.setState({
      page: 0 
    }, () => {
      api.updateProducts(this.props.products)
    });
  }

  handleSelectedProduct = (id) => {
    this.setState({
      selectedProduct: this.props.products.find(product => product.id === id),
      page: 1
    })
  }

  handleDeletingProduct = (id) => {
    this.props.deleteProduct(id)
    this.setState({
      products: this.props.products.filter(product => product.id !== id),
      selectedProduct: null
    }, () => {
      api.updateProducts(this.props.products)
    })
  }

  handleUpdatingProduct = (id) => {
    this.setState({
      selectedProduct: this.props.products(product => product.id === id),
      page: 3
    })
  }

  updateProduct = (editProduct) => {
    // get index of product to update
    // findIndex this.state.selectedProduct
    // reassign the item at that index to updated product

    // set list state again
    const index = this.props.products.findIndex(product => product.id === this.state.selectedProduct.id)

    this.props.products[index] = editProduct
    this.setState({
      products: this.props.products,
      page: 0
    })
  }

  purchaseProduct = () => {
    const index = this.props.products.findIndex(product => product.id === this.state.selectedProduct.id)

    this.props.products[index].quantity--
    if (this.props.products[index].quantity < 0) {
      this.props.products[index].quantity = 0
    }

    // this.props.products[index].quantity = Math.max(
    //   this.props.products[index].quantity - 1,
    //   0
    // )

    this.setState({
      products: this.props.products,
      page: 0,
      itemsInCart: this.state.itemsInCart.concat(this.props.products[index].name)
    })
  }
    
  restockProduct = () => {
    const index = this.props.products.findIndex(product => product.id === this.state.selectedProduct.id)
    this.props.products[index].quantity++
    this.setState({
      products: this.props.products,
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
          productList={this.props.products}
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
        productList={this.props.products}
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
          <button onClick={() => this.props.updatePage(2)}>
            Create Product
          </button>
        </nav>
  
        {views[this.state.page]} 
      </div>
    )
    */
  }
}

export default connect(
  (state) => ({
    products: state.products || [],
    page: state.page || 0,
  }),
  (dispatch) => ({
    updatePage: (page) => dispatch({
      type: 'UPDATE_PAGE',
      page,
    }),
    addProduct: (product) => dispatch({
      type: 'ADD_PRODUCT',
      product,
    }),
    deleteProduct: (id) => dispatch({
      type: 'DELETE_PRODUCT',
      id,
    })
  })
)(App)
