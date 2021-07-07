import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import $ from 'jquery'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import MakeButton from '../components/Button.jsx'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        height: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
    },
    TextField: {
        width: '100%',
        marginBottom: theme.spacing(2),
        textAlign: 'left'
    }
}));


export default function UpdateCard(props) {
    const classes = useStyles();
    const history = useHistory()

    const [name, setName] = useState(props.name);
    const [ingredients, setIngredients] = useState(props.ingredients);
    const [description, setDescription] = useState(props.description);
    const id = props.id

    const url = 'https://cocktail-warehouse.herokuapp.com/product/'
    const urlLocal = 'http://localhost:5000/product/'


    const Update = (e) => {
        let Product = {
            name: name.toUpperCase(),
            ingredients: ingredients.toUpperCase(),
            description: description.toUpperCase(),
            userId: sessionStorage.getItem('userId')
        }
        console.log(Product)
        e.preventDefault()
        $.ajax({
            url:`${urlLocal}${id}`,
            method:'put',
            data:Product,
            success:(res) => {
                history.push('/')
                store.addNotification({
                    message: res.message,
                    type: 'default',
                    container:'center',
                    insert: 'top',
                    dismiss:{
                        duration:2000
                    }
                })

            },
            error: (res) => {
                history.push('/')
                store.addNotification({
                    message: res.message,
                    type: 'danger',
                    container:'center',
                    insert: 'top',
                    dismiss:{
                        duration:2000
                    }
                })
            }
        })
    }

    return (
        <div className={classes.root}>
                    <form id="cocktailCard" className={classes.form} autoComplete="off" onSubmit={Update}>
                        <TextField className={classes.TextField} id="name" label='New Name' variant="outlined" onChange={e=> {setName(e.target.value)}} value={name} />
                        <TextField className={classes.TextField} id="ingredients" label='New Ingredients' variant="outlined" onChange={e=> {setIngredients(e.target.value)}} value={ingredients} />
                        <TextField className={classes.TextField} id="description" label='New Description' multiline variant="outlined" onChange={ e=> {setDescription(e.target.value)}} value={description} />
                        <MakeButton welches={<SaveAltIcon />} text="Update" action={Update} />
                    </form>
        </div>
    );
}