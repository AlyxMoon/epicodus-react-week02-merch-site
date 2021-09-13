import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import './styles/main.css'
import App from './App'
import reducers from './store/product-list-reducers'

const store = createStore(reducers)

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch({
  type: 'ADD_PRODUCT',
  product: {
    name: 'product 1',
    color: 'blue',
  },
})

store.dispatch({
  type: 'ADD_PRODUCT',
  product: {
    name: 'product 2',
    description: 'super blue',
  },
})

store.dispatch({
  type: 'ADD_PRODUCT',
  product: {
    name: 'product 3',
    quantity: 1231321,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
