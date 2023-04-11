
import './App.css';
import {Route,Routes} from "react-router-dom"
import CreateProduct from './components/CreateProduct';
function App() {
  return (
    <>
    <Routes>
      <Route path='/createProduct' element = {<CreateProduct/>}/>
    </Routes>
    </>
  );
}

export default App;
