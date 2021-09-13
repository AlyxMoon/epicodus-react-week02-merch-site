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
          state.products.map(product => ({ ...product })),
          product,
        ],
      }
    case 'DELETE_PRODUCT':
      // original
      let newState = {...state}

      const index = newState.products.findIndex(function (product) {
        return product.id === action.id
      })

      newState.products.splice(index,1)
      return newState

      // const newState = { 
      //   ...state,
      //   products: [
      //     ...state.products,
      //   ]
      // }
      // newState.page = 3

      // newState.products.push('hi')
      // // mystate.products === ['hi']

      // const index = newState.products.findIndex(function (product) {
      //   return product.id === action.id
      // })

      // newState.products.splice(index,1)
      // return newState

    default: return state
  }
}

export default reducers
