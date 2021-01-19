import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import './App.css';
import Navbar from './components/navbar';
import ShippingForm from './views/shippingForm';
import Orderlist from './views/orderList'

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar navLink={{ path: "/orders", Lable: "View Orders" }} />
          <ShippingForm />
        </Route>
        <Route path="/orders">
          <Navbar navLink={{ path: "/", Lable: "Home" }} />
          <Orderlist />
        </Route>
      </Switch>
    </Router>
  </div>
  );
}

export default App;

