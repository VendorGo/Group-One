import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import Home from './pages/public/Home';
import About from './pages/public/About';
import BrowseItems from './pages/public/BrowseItems';
import ItemDetails from './pages/public/ItemDetails';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import MyOrders from './pages/customer/MyOrders';
import OrderDetails from './pages/customer/OrderDetails';
import PaymentPage from './pages/customer/PaymentPage';
import TrackOrder from './pages/customer/TrackOrder';
import SupplierDashboard from './pages/supplier/SupplierDashboard';
import SupplierProfile from './pages/supplier/SupplierProfile';
import AddItem from './pages/supplier/AddItem';
import MyItems from './pages/supplier/MyItems';
import EditItem from './pages/supplier/EditItem';
import SupplierOrders from './pages/supplier/SupplierOrders';
import StationDashboard from './pages/station/StationDashboard';
import StationOrders from './pages/station/StationOrders';
import StationOrderDetails from './pages/station/StationOrderDetails';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageItems from './pages/admin/ManageItems';
import ManageOrders from './pages/admin/ManageOrders';
import ManagePickupStations from './pages/admin/ManagePickupStations';
import ManageCategories from './pages/admin/ManageCategories';

const App = () => (
  <BrowserRouter>
    {/* React Router maps URLs to page components. Nested routes let all public
        pages share one layout and all dashboard pages share another layout. */}
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/items" element={<BrowseItems />} />
        <Route path="/items/:id" element={<ItemDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleBasedRoute roles={['customer']} />}>
          <Route path="/customer" element={<DashboardLayout />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="orders/:id/pay" element={<PaymentPage />} />
            <Route path="track/:id" element={<TrackOrder />} />
          </Route>

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/:orderId" element={<PaymentPage />} />
          <Route path="/orders" element={<MyOrders />} />
        </Route>

        <Route element={<RoleBasedRoute roles={['supplier']} />}>
          <Route path="/supplier" element={<DashboardLayout />}>
            <Route index element={<SupplierDashboard />} />
            <Route path="profile" element={<SupplierProfile />} />
            <Route path="items/new" element={<AddItem />} />
            <Route path="items" element={<MyItems />} />
            <Route path="items/:id/edit" element={<EditItem />} />
            <Route path="orders" element={<SupplierOrders />} />
          </Route>
        </Route>

        <Route element={<RoleBasedRoute roles={['station_officer']} />}>
          <Route path="/station" element={<DashboardLayout />}>
            <Route index element={<StationDashboard />} />
            <Route path="orders" element={<StationOrders />} />
            <Route path="orders/:id" element={<StationOrderDetails />} />
          </Route>
        </Route>

        <Route element={<RoleBasedRoute roles={['admin']} />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="items" element={<ManageItems />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="pickup-stations" element={<ManagePickupStations />} />
            <Route path="categories" element={<ManageCategories />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
