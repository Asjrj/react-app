import React from 'react'
import customerService from '../services/customer-service'
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles'


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  }
})


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      street: '',
      zip: '',
      city: '',
      country: '',
      openDialog: false,
      displayLogin: '',
      displayRegister: 'none',
      dialogTitle: 'Login failed',
      dialogMessage: ''
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  handleLogin = async (event) => {
    event.preventDefault()
    try {
      if (this.state.username === '' || this.state.password === '') {
        this.setState({ openDialog: true, dialogTitle: 'Login failed', dialogMessage: 'Both username and password are required' })
      }
      else {
        let loginData = {
          name: this.state.username,
          password: this.state.password
        }
        const response = await customerService.login(loginData)
        const userFound = response.data
        if (userFound === undefined) {
          this.setState({ openDialog: true, dialogTitle: 'Login failed', dialogMessage: 'Invalid username or password' })
        }
        else {
          window.localStorage.setItem('myCustomer', JSON.stringify(userFound))
          window.location.replace('/')
        }
      }
    }
    catch (exception) {
      this.setState({ openDialog: true, dialogTitle: 'Login failed', dialogMessage: 'Invalid username or password' })
    }
  }

  handleRegister = async (event) => {
    event.preventDefault()
    try {
      if (this.state.username === '' || this.state.password === '' || this.state.email === '' ||
        this.state.street === '' || this.state.zip === '' || this.state.city === '' || this.state.country === '') {
        this.setState({ openDialog: true, dialogTitle: 'Registering failed', dialogMessage: 'All fields are required' })
      }
      else {
        let userFound = this.props.customers.find(customer => {
          return (customer.name === this.state.username)
        })
        if (userFound !== undefined) {
          this.setState({ openDialog: true, dialogTitle: 'Registering failed', dialogMessage: 'User exists - Please use Login option or choose another username' })
        }
        else {
          let userData = {
            name: this.state.username,
            password: this.state.password,
            email: this.state.email,
            street: this.state.street,
            zip: this.state.zip,
            city: this.state.city,
            country: this.state.country
          }
          const response = await customerService.addCustomer(userData)
          const userFound = response.data
          window.localStorage.setItem('myCustomer', JSON.stringify(userFound))
          window.location.replace('/')
        }
      }
    }
    catch (exception) {
      this.setState({ openDialog: true, dialogTitle: 'Registering failed', dialogMessage: 'Invalid username or password' })
    }
  }

  handleDialogClose = () => {
    this.setState({ openDialog: false })
  }

  displayRegister = () => {
    if (this.state.displayRegister === '')
      this.setState({ displayRegister: 'none', displayLogin: '' })
    else
      this.setState({ displayRegister: '', displayLogin: 'none' })
  }


  render() {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <CssBaseline />
        <form style={{ display: this.state.displayLogin }} className={classes.form} onSubmit={this.handleLogin}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
              Log in as existing customer
            </Typography>
            <TextField className={classes.textField}
              required
              label="Name"
              onChange={this.handleChange('username')}
              variant="outlined"
            />
            <TextField className={classes.textField}
              required
              label="Password"
              type="password"
              onChange={this.handleChange('password')}
              variant="outlined"
            />
            <Button className={classes.submit} variant='contained' onClick={this.handleLogin} color="primary">Login</Button>
            <Button className={classes.submit} onClick={this.displayRegister} color="primary">Not registered yet</Button>
          </Paper>
        </form >
        <form style={{ display: this.state.displayRegister }} className={classes.form} onSubmit={this.handleLogin}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
              Register as new customer
            </Typography>
            <TextField className={classes.textField}
              required
              label="Name"
              onChange={this.handleChange('username')}
              variant="outlined"
            />
            <TextField className={classes.textField}
              required
              label="Password"
              type="password"
              onChange={this.handleChange('password')}
              variant="outlined"
            />
            <TextField className={classes.textField}
              required
              type="email"
              autoComplete="email"
              label="Email"
              onChange={this.handleChange('email')}
              variant="outlined"
            />
            <TextField className={classes.textField}
              required
              label="Street"
              onChange={this.handleChange('street')}
              variant="outlined"
            />
            <TextField className={classes.textField}
              required
              label="Zip"
              onChange={this.handleChange('zip')}
              variant="outlined"
            />
            <TextField className={classes.textField}
              required
              label="City"
              onChange={this.handleChange('city')}
              variant="outlined"
            />
            <TextField className={classes.textField}
              required
              label="Country"
              onChange={this.handleChange('country')}
              variant="outlined"
            />
            <Button className={classes.submit} variant='contained' onClick={this.handleRegister} color="primary">Register</Button>
            <Button className={classes.submit} onClick={this.displayRegister} color="primary">Login</Button>
          </Paper>
        </form >
        <Dialog
          open={this.state.openDialog}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.state.dialogTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {this.state.dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    )
  }
}

export default withStyles(styles)(Login)