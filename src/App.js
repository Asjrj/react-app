import React, { Component, Fragment } from 'react';
import customerService from './services/customer-service'
import CustomerComponent from './components/CustomerComponent'
import ProductComponent from './components/ProductComponent'
import TransactionComponent from './components/TransactionComponent'
import TestComponent from './components/TestComponent'
import Login from './containers/Login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { CssBaseline, AppBar, Toolbar, Button, IconButton, Paper, Tabs, Tab } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      customers: [],
      products: [],
      transactions: [],
      events: [],
      loggedInCustomer: null
    }
  }

  async componentDidMount() {
    const loggedInCustomer = window.localStorage.getItem('myCustomer')
    if (loggedInCustomer !== null) this.setState({ loggedInCustomer: loggedInCustomer })
    const customers = await customerService.getCustomers()
    this.setState({ customers: customers.data })
  }

  handleFooterChange(event, value) {
    console.log(value)
    //this.setState({ value })
  }

  render() {
    if (this.state.loggedInCustomer === null) {
      return (
        <div >
          <Login customers={this.state.customers} createNewCustomer={this.createNewCustomer}/>
        </div>
      )
    } else {
      return (
        <Router>
          <Fragment>
            <CssBaseline />
            <AppBar position="static" color='inherit' alue={0}>
              <Toolbar >
                <IconButton><MenuIcon /></IconButton>
                <Button component={Link} to="/">Home</Button>
                <Button component={Link} to="/customers">Customers</Button>
                <Button component={Link} to="/transactions">Transactions</Button>
              </Toolbar>
            </AppBar>
            <Route exact path="/" render={() => <ProductComponent data={this.state.products}></ProductComponent>} />
            <Route exact path="/customers" render={() => <CustomerComponent data={this.state.customers}></CustomerComponent>} />
            <Route exact path="/transactions" render={() => <TransactionComponent data={this.state.transactions}></TransactionComponent>} />
            <Route exact path="/test" render={() => <TestComponent></TestComponent>} />
            <Paper>
              <Tabs value={false} variant='fullWidth' onChange={this.handleFooterChange}>
                <Tab label="One" />
                <Tab label="Two" />
                <Tab label="Three" />
              </Tabs>
            </Paper>
          </Fragment>
        </Router>
      )
    }
  }
}

export default App;
