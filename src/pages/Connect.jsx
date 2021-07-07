import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import $ from 'jquery'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import MakeButton from '../components/Button.jsx'
import { store } from 'react-notifications-component'

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
        marginBottom: theme.spacing(2),
        textAlign: 'left'
    }
}));


export default function Connect() {
    const classes = useStyles();
    const history = useHistory()

    const [username, setUsername] = useState('');

    const url = 'https://cocktail-warehouse.herokuapp.com/user'
    const urlLocal = 'http://localhost:5000/user'


    const connection = (e) => {
        e.preventDefault()

        $.ajax({
            url: `${urlLocal}`,
            method: 'post',
            data: { username },
            success: res => {
                console.log(res)
                sessionStorage.setItem('guestUserId', res.userId)
                history.push('/')
                store.addNotification({
                    message: `You see now the List of ${res.username}`,
                    type: 'default',
                    container: 'center',
                    insert: 'top',
                    dismiss: {
                        duration: 2000
                    }
                })
            },
            error: res => {
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
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <form id="userCard" className={classes.form} autoComplete="off" onSubmit={connection}>
                        <TextField className={classes.TextField} id="name" label='Connect with..' variant="outlined" onChange={e => { setUsername(e.target.value) }} value={username} />
                        <MakeButton welches={<SettingsEthernetIcon />} text="Connect" action={connection} />
                    </form>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}