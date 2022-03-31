import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Dashboard from "../Dashboard";
import ViewFood from "../food/ViewFood";
import Layout from "../Layout";
import ViewOrder from "../order/ViewOrders";
import ViewPayment from "../payment/ViewPayment";
import TableList from "../table/TableList";
import ViewCustomer from "../customer/ViewCustomer";
import SignIn from "./SignIn";
import PropTypes from 'prop-types';
import api from "../api/api";

export default function AuthorizeRoute() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signin" element={<SignIn provider={AuthContext}/>} />
      </Routes>
      <RequireAuth>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/view-table" element={<TableList />} />
            <Route path="/view-food" element={<ViewFood />} />
            <Route path="/view-order" element={<ViewOrder />} />
            <Route path="/payment" element={<ViewPayment />} />
            <Route path="/view-customer" element={<ViewCustomer />} />
          </Routes>
        </Layout>
      </RequireAuth>
    </AuthProvider>
  );
}

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const response = await api.get("/getuser");
      if (response.data && response.data.userName) {
        setUser(response.data.userName);
        navigate(location.pathname);
      }
    };
    getUser();
  },[])

  let signin = (newUser, callback) => {setUser(newUser); callback()};

  let signout = (callback) => {};

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth(props) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    if (location.pathname == "/signin") return null;
    return <Navigate to={"/signin"}/>;
  }

  return props.children;
}

RequireAuth.propTypes = {
  children: PropTypes.node,
};
