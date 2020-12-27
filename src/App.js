import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import AdminRoute from "./routes/AdminRoutes";
import PrivateRoute from "./routes/PrivateRoutes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Signin} />
        <PrivateRoute path="/Home" exact component={Home} />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        {/* <AdminRoute path="/signup" exact component={Signup} /> */}
        {/* <Route path="/cart" exact component={Cart} /> */}
        {/* <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />

        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        /> */}
      </Switch>
    </Router>
  );
}

export default App;
