import React from 'react';
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import ProductCreate from './pages/ProductCreate'

import * as api from './lib/api'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      page: 0,
      fullProductList: [],
      selectedProduct: null
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

  render () {
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
  
        {this.state.page === 0 && (
          <ProductList 
            productList={this.state.fullProductList}
            handleSelectedProduct={this.handleSelectedProduct}
            handleDeletingProduct={this.handleDeletingProduct}
          />
        )}
        {this.state.page === 1 && <ProductDetails product = {this.state.selectedProduct} />}
        {this.state.page === 2 && (
          <ProductCreate onNewProductCreation={(product) => this.addNewProductToList(product)} />
        )} 
      </div>
    )
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
