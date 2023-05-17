import Header from './components/Header'
import Products from './components/Products'
import Product from './components/Product'
import './App.css'
import AddProduct from './components/AddProduct'
import { useState } from "react"

function App() {
  const addProduct = (product) => {
    const id = products.length + 1
    const newProduct = { id, ...product }
    setProducts([...products, newProduct])
    }
  const [products, setProducts] = useState(
    [
    {
    "id": 1,
    "name": "mleko",
    "category": "diary",
    "quantity": 1
    },
    {
    "id": 2,
    "name": "chleb",
    "category": "bread",
    "quantity": 1
    },
    {
    "id": 3,
    "name": "jabłka",
    "category": "fruit&vagetables",
    "quantity": 2
    }
   ])
   const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id))
   }
   
  return (
  <div className="App">
  <Header title="Lista zakupów" />
  <AddProduct onAdd={addProduct} />
  {products.length > 0 ? <Products products={products} onDelete={deleteProduct}/>:<p>Brak produktów</p>}
  
  
  </div>
  )
 }
 export default App
 