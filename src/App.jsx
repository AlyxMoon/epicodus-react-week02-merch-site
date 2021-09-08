import React from 'react';
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import ProductCreate from './pages/ProductCreate'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      page: 0,
    }
  }

  updatePage (newPage = 0) {
    this.setState({
      page: newPage,
    })
  }

  render () {
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
  
        {this.state.page === 0 && <ProductList />}
        {this.state.page === 1 && <ProductDetails />}
        {this.state.page === 2 && <ProductCreate />}
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
