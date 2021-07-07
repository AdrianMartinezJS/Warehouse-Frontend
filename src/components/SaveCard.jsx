import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import $ from 'jquery'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import MakeButton from '../components/Button'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'




const useStyles = makeStyles((theme) => ({
    root: {
        // background: 'linear-gradient(45deg, #41922a 30%, #2ab572 90%)',
        margin: theme.spacing(2),
        height: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
    },
    TextField: {
        width: '100%',
        marginBottom: theme.spacing(1)
    }
}));


export default function SaveCard(props) {
    const classes = useStyles();
    const history = useHistory()

    const [name, setName] = useState(props.name);
    const [ingredients, setIngredients] = useState(props.ingredients);
    const [description, setDescription] = useState(props.description);


    const url = 'https://cocktail-warehouse.herokuapp.com/product'
    const urlLocal = 'http://localhost:5000/product'

    const Save = (e) => {
        let form = new FormData(document.getElementById('cocktailCard'))
        form.append('name', name.toUpperCase())
        form.append('picture', $('input[type=file]')[0].file);
        form.append('ingredients', ingredients.toUpperCase())
        form.append('description', description.toUpperCase())
        form.append('userId', sessionStorage.getItem('userId'))
        e.preventDefault()
        $.ajax({
            url: urlLocal,
            method: 'post',
            processData: false,
            contentType: false,
            data: form,
            success: (res) => {
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
                console.log(res)
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
                    <form id="cocktailCard" className={classes.form} encType="multipart/form-data" autoComplete="off" onSubmit={Save}>
                        <TextField className={classes.TextField} id="name" label="Name of the Cocktail" variant="outlined" onChange={e => { setName(e.target.value) }} value={name} />
                        <TextField className={classes.TextField} name="picture" id="picture" type="file" variant="outlined" />
                        <TextField className={classes.TextField} id="ingredients" label="Ingredients" variant="outlined" onChange={e => { setIngredients(e.target.value) }} value={ingredients} />
                        <TextField className={classes.TextField} id="description" label="Description" multiline variant="outlined" onChange={e => { setDescription(e.target.value) }} value={description} />
                        <MakeButton welches={<SaveAltIcon />} text="Save" action={Save} />
                    </form>
        </div>
    );
}