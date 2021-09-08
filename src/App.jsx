import React from 'react';
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import ProductCreate from './pages/ProductCreate'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      page: 0,
      fullProductList: []
    }
  }

  updatePage (newPage = 0) {
    this.setState({
      page: newPage,
    })
  }

  addNewProductToList = (newProduct) => {
    const newFullProductList = this.state.fullProductList.concat(newProduct);
    this.setState({ fullProductList: newFullProductList, page: 0 });
  }

  render () {
    console.log(this.state)

    return (
      <div className="App">
        <nav>
          <button onClick={() => this.updatePage(0)}>
            Product List
          </button>
          <button onClick={() => this.updatePage(1)}>
            Product Details
          </button>
          <button onClick={() => this.updatePage(2)}>
            Create Product
          </button>
        </nav>
  
        {this.state.page === 0 && <ProductList productList={this.state.fullProductList} />}
        {this.state.page === 1 && <ProductDetails />}
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
