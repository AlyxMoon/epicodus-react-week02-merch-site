
export const getProducts = async () => {
  const products = window.localStorage.getItem('products') || '[]'
  return JSON.parse(products)
}

export const updateProducts = async (products) => {
  window.localStorage.setItem('products', JSON.stringify(products))
  return products
}
