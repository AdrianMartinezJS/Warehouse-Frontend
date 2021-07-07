import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../service/Copyright'
import $ from 'jquery'
import { useHistory } from "react-router-dom";
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn() {
  const classes = useStyles();
  let history = useHistory();

  const url = 'https://cocktail-warehouse.herokuapp.com/signin'
  const urlLocal = 'http://localhost:5000/SignIn'


  const HandleSubmit = (e) => {

    e.preventDefault();
    let username = e.target[0].value
    let password = e.target[2].value
  
    $.ajax({
      url:urlLocal,
      method:'post',
      data:{
        username,
        password
      },
      success: (res) => {
        // async function setToken () {
          // let token = sessionStorage.setItem('token', res.token)
          // return token
        //   return sessionStorage.setItem('token' , res.token)
        // }
        // setToken().then(history.push('/'))
        sessionStorage.setItem('userId', res.userId)
        sessionStorage.setItem('token', res.token)
        // let token = sessionStorage.getItem('token')
        // if(token) history.push('/')
        history.push('/')
        window.location.reload();
      //   store.addNotification({
      //     message: `Hallo ${res.username}`,
      //     type: 'info',
      //     container:'top-right',
      //     insert: 'top',
      //     dismiss:{
      //         duration:2000
      //     }
      // })

      },
      error: (res) => {
        console.log(res)
      }
    })
    // SignReq({ path:'SignIn' , method:'post' , data:{username,password} })
    
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} onSubmit={HandleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="email"
            autoComplete="off"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onSubmit={HandleSubmit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}