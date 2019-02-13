import React, { Component } from 'react';
import customerService from './services/customer-service'
import CustomerComponent from './components/CustomerComponent'
import ProductComponent from './components/ProductComponent'
import OrderComponent from './components/OrderComponent'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      customers: [],
      products: [],
      orders: []
    }
  }

  async componentDidMount() {
    const customers = await customerService.getCustomers()
    this.setState({ customers: customers.data })
  }

  render() {
    return (
      <Router>
        <div>
          <AppBar position="static" color='inherit'>
            <Toolbar>
              <IconButton><MenuIcon /></IconButton>
              <Button component={Link} to="/">Home</Button>
              <Button component={Link} to="/customer">Customers</Button>
              <Button component={Link} to="/orders">Orders</Button>
            </Toolbar>
          </AppBar>
          <Route exact path="/" render={() => <ProductComponent data={this.state.products}></ProductComponent>} />
          <Route exact path="/customer" render={() => <CustomerComponent data={this.state.customers}></CustomerComponent>} />
          <Route exact path="/orders" render={() => <OrderComponent data={this.state.orderss}></OrderComponent>} />
        </div>
      </Router>
    )
  }
}

export default App;
