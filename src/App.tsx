import "./App.css";
import { Route, Routes } from "react-router-dom";
import CreateProduct from "./components/CreateProduct";
import Products from "./components/Products";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Cart from "./components/Cart";
import ProductInfo from "./components/ProductInfo";
import Users from "./components/Users";
import RequireAuth from "./components/RequireAuth";
import { useGSelector } from "./redux/store";
import PaypalCheckoutButton from "./components/PaypalCheckoutButton";

function App() {
  const loginUserName = useGSelector((state) => state.userState.loginUser);
  const loginUserPermission = useGSelector(
    (state) => state.userState.permission
  );

  return (
    <div style={{ overflow: "hidden", textAlign: "center" }}>
      <Navbar />
      <div className="routesWarpper">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/productInfo/:id?" element={<ProductInfo />} />
          <Route path="/products/:category?" element={<Products />} />

          <Route element={<RequireAuth />}>
            {loginUserName && loginUserPermission && (
              <>
                <Route path="/" element={<CreateProduct />} />
                <Route
                  path="/create-product/:id?"
                  element={<CreateProduct />}
                />
                <Route path="/users" element={<Users />} />
                <Route path="/signUp/:userId?" element={<SignUp />} />
              </>
            )}
            {loginUserName && !loginUserPermission && (
              <>
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/paypalCheckOutButton/:price?"
                  element={<PaypalCheckoutButton />}
                />
              </>
            )}
          </Route>
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
