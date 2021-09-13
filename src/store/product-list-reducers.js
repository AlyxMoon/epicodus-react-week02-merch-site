/*
const state = {
  products: [
    413124123213123442131: {

    },
    4897418321-0547891321: {
      
    }
  ],


  
}
*/

const defaultState = {
  products: [],
}

// action = {
//   type: 'ADD_MERCH',
//   name: 'product 1',
//   id:  uuid(),
// }

// action = {
//  type: 'ADD_MERCH',
//  product: {
//    name: 'product 1',
//    id: uuid(),
//  }
// }

// state === undefined
const reducers = (state, action) => {  
  // console.log('sanity check mode', state, action)
  if (!state) {
    state = { ...defaultState }
  }

  switch (action.type) {
    case 'ADD_PRODUCT':
      const product = {
        ...action.product
      }
    
      return {
        ...state,
        products: [
          ...state.products,
          product,
        ],
      }
    default: return state
  }
}

export default reducers
