
import './App.css';
import { Route, Routes } from "react-router-dom"
import CreateProduct from './components/CreateProduct';
import Products from './components/Products';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CreateProduct />} />
        <Route path='/create-product/:id?' element={<CreateProduct />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
