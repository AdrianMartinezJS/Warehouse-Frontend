import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import $ from 'jquery'
import AddIcon from '@material-ui/icons/Add';
import MakeAccordion from '../components/Accordion.jsx'
import MakeButton from '../components/Button.jsx'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ReactNotification from 'react-notifications-component'

const useStyles = makeStyles((theme) => ({
  TextField: {
    width: '53%',
    margin: theme.spacing(1),
  },
  Button: {
    background: 'rgba(42,110,181,1)',
    position: 'absolute',
    right: '1%',
    top: '1%',
    fontSize: '0.5em',
    color: '#fff'
  },
  ButtonL: {
    background: 'rgba(42,110,181,1)',
    position: 'absolute',
    left: '1%',
    top: '1%',
    fontSize: '0.5em',
    color: '#fff'
  },
  ButtonAdd: {
    background: 'rgba(42,110,181,1)',
    color: '#fff',
    width: '90%',
    margin: theme.spacing(2),
  },
  Info: {
    marginTop: '5%',
    padding: '2%',
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    justifyContent: 'center',

  }
}));

export default function HomePage() {
  const userId = sessionStorage.getItem('userId')
  const guestUserId = sessionStorage.getItem('guestUserId')
  const history = useHistory()
  const classes = useStyles();
  const [products, setProducts] = useState([])
  const [guestProducts, setGuestProducts] = useState([])
  const [search, setSearch] = useState('')

  const url = 'https://cocktail-warehouse.herokuapp.com/product/'
  const urlLocal = 'http://localhost:5000/product/'

  if (guestUserId) {
    useEffect(() => {
      $.ajax({
        url: `${urlLocal}${guestUserId}`,
        success: (res) => {
          let cocktails = res.products.sort((a, b) => { return (a.name - b.name) })
          setGuestProducts(cocktails)
        },
        error: (res) => {
          console.log(res)
        }
      })
    }, [])
  }

  useEffect(() => {
    $.ajax({
      url: `${urlLocal}${userId}`,
      success: (res) => {
        let cocktails = res.products.sort((a, b) => { return (a.name - b.name) })
        setProducts(cocktails)
      },
      error: (res) => {
        console.log(res)
      }
    })

  }, [])

  let Cocktails;

  if (!guestUserId) {
    if (search == '') {
      Cocktails = products.sort(function (a, b) { return (a.name - b.name) }).map((product, index) => {
        return (
          <MakeAccordion
            key={product._id}
            nummer={index}
            id={product._id}
            picture={product.picture}
            name={product.name}
            description={product.description}
            ingredients={product.ingredients}
            rating={product.rating}
          />
        )
      })
    } else {
      Cocktails = products.filter(product => product.ingredients.includes(search.toUpperCase())).map((product, index) => {
        return (
          <MakeAccordion
            key={product._id}
            nummer={index}
            id={product._id}
            picture={product.picture}
            name={product.name}
            description={product.description}
            ingredients={product.ingredients}
            rating={product.rating}
          />
        )
      })
    }
  } else if (guestUserId) {
    if (search == '') {
      Cocktails = guestProducts.sort(function (a, b) { return (a.name - b.name) }).map((product, index) => {
        return (
          <MakeAccordion
            key={product._id}
            nummer={index}
            id={product._id}
            picture={product.picture}
            name={product.name}
            description={product.description}
            ingredients={product.ingredients}
            guest
            rating={product.rating}
          />
        )
      })
    } else {
      Cocktails = guestProducts.filter(product => product.ingredients.includes(search.toUpperCase())).map((product, index) => {
        return (
          <MakeAccordion
            key={product._id}
            nummer={index}
            id={product._id}
            picture={product.picture}
            name={product.name}
            description={product.description}
            ingredients={product.ingredients}
            guest
            rating={product.rating}

          />
        )
      })
    }
  }

  const logOut = e => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('guestUserId')
    history.push('/')
    window.location.reload()
  }

  const connect = e => {
    history.push('/Connect')
  }

  const disconnect = e => {
    sessionStorage.removeItem('guestUserId')
    window.location.reload()
  }

  if (products.length == 0 && !guestUserId) {
    return (
      <div>
        <ReactNotification />
        <MakeButton text="Connect" action={connect} className={classes.ButtonL} />
        <MakeButton text="Log Out" action={logOut} className={classes.Button} />
        <div className={classes.Info} >
          <h1>Cocktail Warehouse</h1>
          <hr />
          <h5>This Application allows you to save your own recipes.</h5>
          <br />
          <h5>You also can connect with your friends or your Barkeeper to see their recipes! Just click at the Button on the top-left( <em><b>connect</b></em> ), enter his or her name and take a look at their List! </h5>
          <p>Click at the Button below to add your first recipe.</p>
          <em>(You will be asked to give a Name for the Cocktail, Picture, Ingredients and Description how to make it. Please enter all of them!)</em>
        </div>
        <MakeButton welches={<AddIcon />} text="Add Cocktail" action={(e) => { history.push('/SaveCocktail') }} />
      </div>
    )
  } else if (guestUserId) {
    return (
      <div>
        <ReactNotification />
        <TextField className={classes.TextField} id="search" label="Search Cocktails with.." variant="outlined" onChange={e => { setSearch(e.target.value) }} value={search} />
        <MakeButton text="Discon." action={disconnect} className={classes.ButtonL} />
        <MakeButton text="Log Out" action={logOut} className={classes.Button} />
        {Cocktails}
      </div>
    );
  } else {
    return (
      <div>
        <ReactNotification />
        <TextField className={classes.TextField} id="search" label="Search Cocktails with.." variant="outlined" onChange={e => { setSearch(e.target.value) }} value={search} />
        <MakeButton text="Connect" action={connect} className={classes.ButtonL} />
        <MakeButton text="Log Out" action={logOut} className={classes.Button} />
        {Cocktails}
        <MakeButton welches={<AddIcon />} text="Add Cocktail" action={(e) => { history.push('/SaveCocktail') }} />
      </div>
    );
  }
}