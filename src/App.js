import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddCategory from "./admin/pages/AddCategory";
import AddProduct from "./admin/pages/AddProduct";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import AdminRoute from "./routes/AdminRoutes";
import PrivateRoute from "./routes/PrivateRoutes";
import ManageProducts from "./admin/pages/ManageProducts";
import UpdateProduct from "./admin/pages/UpdateProduct";
import ManageCategories from "./admin/pages/ManageCategories";
import UpdateCategory from "./admin/pages/UpdateCategory";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Signin} />
        <PrivateRoute path="/Home" exact component={Home} />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoute path="/signup" exact component={Signup} />
        {/* <Route path="/cart" exact component={Cart} /> */}
        {/* <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        
        */}
      </Switch>
    </Router>
  );
}

export default App;
