import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import $ from 'jquery'
import Copyright from '../service/Copyright'
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignUp() {
  const classes = useStyles();
  let history = useHistory();

  const url = 'https://cocktail-warehouse.herokuapp.com/signup'
  const urlLocal = 'http://localhost:5000/SignUp'


  const HandleSubmit = (e) => {

    e.preventDefault()
    let username = e.target[0].value
    let password = e.target[2].value
    $.ajax({
      url: urlLocal,
      method: 'post',
      data: {
        username,
        password
      },
      success: (res) => {
        sessionStorage.setItem('userId', res.userId)
        sessionStorage.setItem('token', res.token)
        history.push('/')
        window.location.reload();
      //   store.addNotification({
      //     message: res.message,
      //     type: 'success',
      //     container:'top-right',
      //     insert: 'top',
      //     dismiss:{
      //         duration:2000
      //     }
      // })
      },
      error: (res) => {
        console.log(res)
        // MakeDialog({ title: res.status , text: res.message })

      }
    })

  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={HandleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onSubmit={HandleSubmit}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}